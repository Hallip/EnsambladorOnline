var count = 0;

function appnd(){
var fil = document.createElement("tr");

var hll = document.createElement("td");
var labels = document.createElement("td");
var mnemonic = document.createElement("td");
var operands = document.createElement("td");
var mem = document.createElement("td");
var machine = document.createElement("td");


var hlli = document.createElement("textarea");
var labelsi = document.createElement("textarea");
var mnemonici = document.createElement("textarea");
var operandsi = document.createElement("textarea");
var memi = document.createElement("textarea");
var machinei = document.createElement("textarea");


hlli.setAttribute("id", ("hll"+ String(count)));
labelsi.setAttribute("id", ("lab"+ String(count)));
mnemonici.setAttribute("id", ("mne"+ String(count)));
operandsi.setAttribute("id", ("ope"+ String(count)));
memi.setAttribute("id", ("mem"+ String(count)));
machinei.setAttribute("id", ("mac"+ String(count)));

hlli.setAttribute("type", "text");
labelsi.setAttribute("type", "text");
mnemonici.setAttribute("type", "text");
operandsi.setAttribute("type", "text");
memi.setAttribute("type", "text");
machinei.setAttribute("type", "text");



hll.appendChild(hlli);
labels.appendChild(labelsi);
mnemonic.appendChild(mnemonici);
operands.appendChild(operandsi);
mem.appendChild(memi);
machine.appendChild(machinei);


fil.appendChild(hll);
fil.appendChild(labels);
fil.appendChild(mnemonic);
fil.appendChild(operands);
fil.appendChild(mem);
fil.appendChild(machine);

document.getElementById("assamblyTable").appendChild(fil);
count++;
}

function remove(){
  if(count > 5){
    var list = document.getElementById("assamblyTable");
    var temp = count;
    temp++;
    list.removeChild(list.childNodes[temp]);
    count--;
  }
}

function checkSyntax(){
  var memonics = ["LODD","STOD","ADDD","SUBD","JPOS","JZER","JUMP","LOCO","LODL","STOL","ADDL","SUBL","JNEG","JNZE","CALL","PUSHI","POPI","PUSH","POP","RETN","SWAP","INSP","DESP","INPAC","OUTAC","HALT",""]
  var list = [];
  var error = false;
  for (var i = 0; i < count; i++) {
    id = "mne" + String(i);
    try {
      mne = String(document.getElementById(id).value);
      if (memonics.includes(mne) || (mne.charAt(0) == '$')){
        if(list.includes(mne) && (mne.charAt(0) == '$')){
          alert("Duplicated variable at: "+ String(i))
          document.getElementById(id).style.color = '#e0555a';
          error = true;
        }
        else {
          list.push(document.getElementById(id).value);
          document.getElementById(id).style.color = '#646464';
        }
      }
      else {
        alert("Syntax Error in line: "+ String(i));
        document.getElementById(id).style.color = '#e0555a';
        error = true;
      }
      if (mne != '' && (String(document.getElementById("mne" + String(i-1)).value) == '')){
        error = true;
        alert("Incomplete Syntax at: "+ String(i));
        document.getElementById(id).style.color = '#e0555a'
      }

    } catch (e) {
      console.log(e);
    }
  }
  if (!error) {
    alert("Syntax Generated susfully");
  }
}

function clearTable(){
  for (var i = 0;i < count; i++) {
    var colums = ["hll","lab","mne","ope","mem","mac"];
    for (var j = 0; j < colums.length; j++) {
      id = colums[j] + String(i);
      try {
        document.getElementById(id).value = '';
      } catch (e) {
        console.log(e);
      }
    }
  }
}

function generate(){
  var memonics = ["LODD","STOD","ADDD","SUBD","JPOS","JZER","JUMP","LOCO","LODL","STOL","ADDL","SUBL","JNEG","JNZE","CALL","PUSHI","POPI","PUSH","POP","RETN","SWAP","INSP","DESP","INPAC","OUTAC","HALT"];
  var machCode = ["00xx","10xx","20xx","30xx","40xx","50xx","60xx","70xx","80xx","90xx","A0xx","B0xx","C0xx","D0xx","E0xx","F000","F100","F200","F300","F400","F500","F6yy","F7yy","F800","F900","FA00"];
  var lines = 0;
  var operations = [];

  for (var i = 0; i < count; i++) {
    var id = "mne" + String(i);
    var hex = "mem" + String(i);
    try {
      mne = String(document.getElementById(id).value);
      if (memonics.includes(mne) || (mne.charAt(0) == '$')) {
        document.getElementById(hex).value =  toPaddedHexString(i, 2);

        var labelGen =  document.getElementById(('lab'+String(i))).value;
        var mnemonicGen = document.getElementById(('mne'+String(i))).value;
        var operandsGen = document.getElementById(('ope'+String(i))).value;
        var memGen = document.getElementById(('mem'+String(i))).value;

        var opJSON = {
          "label" : labelGen,
          "mnemonic" : mnemonicGen,
          "operands" : operandsGen,
          "memPosition" : memGen
        }
        operations.push(opJSON);
        lines++;
      }

    } catch (e) {
        console.log(e);
    }
  }

  var symbols = [];

  for (var operand in operations) {
    if (operations[operand].label != "" || operations[operand].mnemonic.charAt(0) == '$' ){
        symbols.push(operations[operand]);
    }
  }

  //clear table

  try {
      document.getElementById("simbolsTable").remove();
      var table = document.createElement("table");
      table.setAttribute("id", "simbolsTable");
      document.getElementById("symbolsTable").appendChild(table);
  } catch (e) {
      console.log(e)
  }

  //Create Table
  var head = document.createElement("tr");
  var name = document.createElement("th");
  var content = document.createElement("font");
  var text = document.createTextNode("Nombre");
  content.appendChild(text);
  content.setAttribute("color", "white");
  content.setAttribute("size", 5);
  name.appendChild(content);
  head.appendChild(name);
  var text2 = document.createTextNode("Valor");
  var content2 = document.createElement("font");
  content2.appendChild(text2);
  var name2 = document.createElement("th");
  content2.setAttribute("color", "white");
  content2.setAttribute("size", 5);
  name2.appendChild(content2);
  head.appendChild(name2);
  document.getElementById("simbolsTable").appendChild(head);

  // append Table content

  for (var symbol in symbols) {
    var row = document.createElement("tr");
    var nameColum = document.createElement("td");
    var posiColum = document.createElement("td");
    var nameContent = document.createElement("h4");
    var positionContent = document.createElement("h4");
    if ((symbols[symbol].mnemonic).charAt(0) == '$' ){
      var nameText = document.createTextNode(symbols[symbol].mnemonic);
    }
    else{
      var nameText = document.createTextNode(symbols[symbol].label)
    }
    var posiText = document.createTextNode(symbols[symbol].memPosition);

    nameContent.appendChild(nameText);
    positionContent.appendChild(posiText);

    nameColum.appendChild(nameContent);
    posiColum.appendChild(positionContent);

    row.appendChild(nameColum);
    row.appendChild(posiColum);

    document.getElementById("simbolsTable").appendChild(row);

  }
  for (var i = 0; i < lines; i++) {
    var mne = document.getElementById("mne" + String(i)).value;
    var index = memonics.indexOf(mne);
    var hexCode = machCode[index];

    if (document.getElementById("ope" + String(i)).value == "") {
      document.getElementById("mac"+String(i)).value = hexCode;
    }
    else if (document.getElementById("ope" + String(i)).value != "") {
      if (hexCode.includes("x")){
        var ope = document.getElementById("ope" + String(i)).value;
        if (isNormalInteger(ope)){
            num = toPaddedHexString(parseInt(ope),2);
            console.log(num)
            hexCode = hexCode.replace("xx", num);
        }
        else {
          for (var x in symbols) {
              if (symbols[x].label == ope || symbols[x].mnemonic == ope){
                var posOperand = symbols[x].memPosition
              }
          }
          hexCode = hexCode.replace("xx", posOperand);
        }
        document.getElementById("mac"+String(i)).value = hexCode;
      }
    }
    else if ((symbols[symbol].mnemonic).charAt(0) == '$') {
      document.getElementById("mac"+String(i)).value = '0000';
    }

  }

}

function toPaddedHexString(num, len) {
  str = num.toString(16);
  return ("0".repeat(len - str.length) + str).toUpperCase();
}

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function downloadMem() {
  let content = "; Sample memory initialization file for Single Port Block Memory, \n; v3.0 or later.\n;\n; This .COE file specifies initialization values for a block \n; memory of depth=16, and width=8. In this case, values are \n; specified in hexadecimal format.\nmemory_initialization_radix=16;\nmemory_initialization_vector="
  for (var i = 0; i < count; i++) {
      let contenido = document.getElementById("mac"+String(i)).value;
      alert(contenido)
      if(contenido != ""){
        content = content + "\n"+ contenido
      }
  }

  download("initRam.coe",content)
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
