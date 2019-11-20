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
  var memonics = ["LODD","STOD","ADDD","SUBD","JPOS","JZER","JUMP","LOCO","LODL","STOL","ADDL","SUBL","JNEG","JNZE","CALL","PUSHI","POPI","PUSH","POP","RETN","SWAP","INSP","DESP","INPAC","OUTAC","HALT"]
  for (var i = 0; i < count; i++) {
    var id = "mne" + String(i);
    var hex = "mem" + String(i);
    try {
      mne = String(document.getElementById(id).value);
      if (memonics.includes(mne) || (mne.charAt(0) == '$')) {
        document.getElementById(hex).value =  toPaddedHexString(i, 2);
      }

    } catch (e) {
        console.log(e);
    }
  }
}

function toPaddedHexString(num, len) {
    str = num.toString(16);
    return ("0".repeat(len - str.length) + str).toUpperCase();
}
