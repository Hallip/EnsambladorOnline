var count = 0;

function add(){
  var fil = document.createElement("tr");

  var hll = document.createElement("td");
  var labels = document.createElement("td");
  var mnemonic = document.createElement("td");
  var operands = document.createElement("td");
  var mem = document.createElement("td");
  var machine = document.createElement("td");


  var hlli = document.createElement("input");
  var labelsi = document.createElement("input");
  var mnemonici = document.createElement("input");
  var operandsi = document.createElement("input");
  var memi = document.createElement("input");
  var machinei = document.createElement("input");


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
