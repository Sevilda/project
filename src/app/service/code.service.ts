import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor() { }

  file: File;
  valid: boolean = false;

  async encode(text: string) {
    //create a view to work with the existing data and a file that will be our output
    var view = await this.readFile();
    var viewLen = await this.getfileLen();
    var newFile = new Array();
    for (let i = 0; i < 6; i++) {
      newFile[i] = view[i];
    }
    //get text and save it into the reserved area (6-9 byte)
    var len = text.length.toString(2)
    newFile[6] = parseInt(len.slice(-8), 2)
    newFile[7] = parseInt(len.slice(-16, -8), 2)
    newFile[8] = parseInt(len.slice(-24, -16), 2)
    newFile[9] = parseInt(len.slice(-32, -24), 2)

    //convert text into bytearray
    var binaryString = '';
    for (let i = 0; i < text.length; i++) {
      //make them uniformly 8 bits
      var val = 8 - text.charCodeAt(i).toString(2).length
      while (val > 0) {
        binaryString += '0'
        val--
      }
      binaryString += text.charCodeAt(i).toString(2)
    }

    console.log(binaryString);
    //find where the data starts (10-13 byte) 
    var dataStartIndex = parseInt(view[10]) + 256 * parseInt(view[11] + 16 * 256 * parseInt(view[12]) * parseInt(view[13]))
    for (let i = 10; i < dataStartIndex; i++) {
      newFile[i] = view[i]
    }
    //substitute every last 2 bit with the first two digits of the bytearray
    for (let i = dataStartIndex; i < dataStartIndex + text.length * 4; i++) {
      //has trouble with handling values less than 3 bits
      if (view[i]>3)
        newFile[i] = parseInt(view[i].toString(2).slice(0, -2).concat(binaryString.substr(0, 2)), 2)
      else 
        newFile[i] = binaryString.substr(0, 2)
      binaryString = binaryString.substr(2, binaryString.length)
      console.log(i)
        }


    //finish copying the rest of the file
    for (let i = dataStartIndex + text.length * 4; i < viewLen; i++) {
      console.log(i)
      newFile[i] = view[i]
    }
    //return new file
    return newFile;
  }



  async decode(): Promise<string> {
    var bytearray = "";
    var view = await this.readFile();
    //read text length from header[6-9]
    var len = parseInt(view[6]) + 256 * parseInt(view[7]) + 16 * 256 * parseInt(view[8]) + 256 * 256 * parseInt(view[9])

    if (len==0) return ""

    //find where the data starts (10-13 byte) 
    var dataStartIndex = parseInt(view[10]) + 256 * parseInt(view[11] + 16 * 256 * parseInt(view[12]) + 256 * 256 * parseInt(view[13]))
    //for length*4, read every last 2 bytes into bytearray
    for (let i = dataStartIndex; i < dataStartIndex + len * 4; i++) {
      //values stored on 1 bit are the death of this
      if (view[i]>2)
        bytearray = bytearray.concat(view[i].toString(2).slice(-2));  
      else {
        bytearray += "0" + view[i].toString(2)
      }

    
    }
    //reset the value of the text variable
    var text = ""
    //convert the bytearray into text
    console.log(bytearray)
    while (bytearray) {
      text += String.fromCharCode(parseInt(bytearray.substr(0, 8), 2))
      bytearray = bytearray.substr(8, bytearray.length);
    }

    
    return text;
  }

  saveFile(file: File) {
    this.file = file;
    //console.log("new file")
    this.valid = true;
  }

  async getAvailableSpace(): Promise<number> {

    return new Promise(async (resolve, reject) => {
      if (this.file) {
        var view = await this.readFile();
        var height = parseInt(view[18]) + 256 * parseInt(view[19] + 16 * 256 * parseInt(view[20]) + 256 * 256 * parseInt(view[21]))
        var width = parseInt(view[22]) + 256 * parseInt(view[23] + 16 * 256 * parseInt(view[24]) + 256 * 256 * parseInt(view[25]))
        resolve((height * width) * 3 / 4)
      }
      else reject()
    })
  }


  async readFile() {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort()
        reject()
      }
      reader.onload = function () {
        var arrayBuffer = <ArrayBuffer>reader.result;
        resolve(new Uint8Array(arrayBuffer))
      }
      reader.readAsArrayBuffer(this.file);
    })
  }

  async getfileLen(): Promise<number> {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort()
        reject()
      }
      reader.onload = function () {
        var arrayBuffer = <ArrayBuffer>reader.result;
        resolve(arrayBuffer.byteLength)
      }
      reader.readAsArrayBuffer(this.file);
    })
  }

}

