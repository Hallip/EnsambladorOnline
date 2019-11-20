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
      console.log(temp);
      list.removeChild(list.childNodes[temp]);
      count--;
    }
}

function checkSyntax(){
    var memonics = ["LODD","STOD","ADDD","SUBD","JPOS","JZER","JUMP","LOCO","LODL","STOL","ADDL","SUBL","JNEG","JNZE","CALL","PUSHI","POPI","PUSH","POP","RETN","SWAP","INSP","DESP","INPAC","OUTAC","HALT",""]
    var list = [];
    for (var i = 0; i < count; i++) {
      id = "mne" + String(i);
      try {
        mne = String(document.getElementById(id).value);
        console.log(mne);
        if (memonics.includes(mne) || (mne.charAt(0) == '$')){
          if(list.includes(mne) && (mne.charAt(0) == '$')){
            alert("Duplicated variable at: "+ String(i))
            document.getElementById(id).style.color = '#e0555a';
          }
          else {
            list.push(document.getElementById(id).value);
            document.getElementById(id).style.color = '#646464';
          }
        }
        else {
          alert("Syntax Error in line: "+ String(i))
          document.getElementById(id).style.color = '#e0555a';
        }

      } catch (e) {
        console.log("e");
      }
    }
    alert("Syntax Generated susfully")
}
