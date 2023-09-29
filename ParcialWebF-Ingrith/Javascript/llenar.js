const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
var bt =document.getElementById("bt1");
var bt2=document.getElementById("bt2");
let id=1;
var element=[];
xhr.open("GET","./Resources/departments.json",true)
xhr2.open("GET","./Resources/towns.json",true)
var data,data2;
xhr.onreadystatechange = ()=>{
  if( xhr.readyState === 4 ){
    data = JSON.parse(xhr.responseText);
    //showData( data )
    fillBydepartaments(data);
    bt.addEventListener("click",function(){
       lis();})
    bt2.addEventListener("click",function(){
        fil();})
    
  }
}
xhr.send();
xhr2.onreadystatechange = ()=>{
    if( xhr2.readyState === 4 ){
      data2 =JSON.parse(xhr2.responseText);
      //showData( data )
      fillByMunicipios(data,data2);
      //bt.addEventListener("click",function(){
        //  lis(data);})
      
    }
  }
xhr2.send();


function showData(data){
  console.log(data)
  const body = document.getElementById('datost')
  data.forEach((character)=>{
    columnas(character,body);
  }
  )

}


function fillBydepartaments(data) {
    var selec = document.getElementById('sDepartamento');
    var departament = [];

    // Limpiamos el select
    // Iteramos sobre los datos JSON
    data.forEach((departamento)=>{
        if (!departament.includes(departamento.name)) {
            departament.push(departamento.name);
            var option = document.createElement('option');
            option.value = departamento.name;
            option.textContent = departamento.name;
            selec.appendChild(option);
        }
    });
  }

  function fillByMunicipios(data,data2){
    var selec = document.getElementById('sMunicipio');
    var selecd= document.getElementById('sDepartamento')
    var municipio1 =[];
    //Limpiar el select para evitar duplicidad
    //selec.innerHTML="";
    //Iterar sobre datos
    
        if(selecd.selectedIndex!==0){
            var departmentMapping = {};
                data.forEach((departamento) => {
                    departmentMapping[departamento.
                    department.name] = departamento.code;
                });
            var filtroMunicipios = data2.filter(function (municipio) {
                return municipio.department === departmentMapping;
              });
          
              // Create options for the filtered municipalities
              filtroMunicipios.forEach(function (municipio) {
                if (!municipio1.includes(municipio.name)) {
                    municipio1.push(municipio.name);
                    var option = document.createElement('option');
                    option.value = municipio.name;
                    option.textContent = municipio.name;
                    selec.appendChild(option);
                }
              });
        }
    
  }

  function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var fechaNac =new Date(fechaNacimiento);
    console.log(fechaNac.getFullYear());
    var edad = hoy.getFullYear() - fechaNac.getFullYear();  
    return edad;
  }

  function lis(){
    var selecD=document.getElementById('sDepartamento').value;
    var selecM=document.getElementById('sMunicipio').value;
    var nombre=document.getElementById('i1').value;
    var apellido=document.getElementById('i2').value;
    var fecha=document.getElementById('i3').value;
    var edad= calcularEdad(fecha);
    var salario=document.getElementById('i4').value;
    var body=document.getElementById('datost');
    var jsonData = {
        id: id,
        apellido: nombre + apellido,
        departamento: selecD,
        municipio: selecM,
        edad:edad,
      };
      element.push(jsonData);
      columnas(jsonData,body);
}
   
function fil(){
    var selecD=document.getElementById('sDepartamento').value;
    var selecM=document.getElementById('sMunicipio').value;
    var nombre=document.getElementById('i1').value;
    var apellido=document.getElementById('i2').value;
    var fecha=document.getElementById('i3').value;
    var edad= calcularEdad(fecha);
    var salario=document.getElementById('i4').value;
    var body=document.getElementById('datost2');
    var filtro=document.getElementById('if').value;
    

    for(var i=0;i<element.length;i++){
        if(filtro==element[i].id){
            var jsonData = {
                id: id,
                apellido: nombre + apellido,
                departamento: selecD,
                municipio: selecM,
                edad:edad,
                salario:salario,
                fechaN:fecha
        
              };
              columnas1(element[i],body);
            columnas1(jsonData,body);
        }
    }
   
}
    

function columnas(character, body){
    const row = document.createElement('tr')

    const colId = document.createElement('td')
    colId.appendChild( document.createTextNode(id))
    row.appendChild(colId)

    const colApellido = document.createElement('td');
    colApellido.appendChild(document.createTextNode(character.apellido));
    row.appendChild(colApellido)
    
    const colDepartamento=document.createElement('td');
    colDepartamento.appendChild(document.createTextNode(character.departamento));
    row.appendChild(colDepartamento);
  
    const colMunicipio=document.createElement('td');
    colMunicipio.appendChild(document.createTextNode(character.municipio));
    row.appendChild(colMunicipio);

    const colFecha=document.createElement('td');
    colFecha.appendChild(document.createTextNode(character.edad));
    row.appendChild(colFecha);
    body.appendChild(row)
    id++;
}
function columnas1(character, body){
    const row = document.createElement('tr')

    const colId = document.createElement('td')
    colId.appendChild( document.createTextNode(id))
    row.appendChild(colId)

    const colApellido = document.createElement('td');
    colApellido.appendChild(document.createTextNode(character.apellido));
    row.appendChild(colApellido)
    
    const colDepartamento=document.createElement('td');
    colDepartamento.appendChild(document.createTextNode(character.departamento));
    row.appendChild(colDepartamento);
  
    const colMunicipio=document.createElement('td');
    colMunicipio.appendChild(document.createTextNode(character.municipio));
    row.appendChild(colMunicipio);

    const colFecha=document.createElement('td');
    colFecha.appendChild(document.createTextNode(character.edad));
    row.appendChild(colFecha);
    const colsalario=document.createElement('td');
    colsalario.appendChild(document.createTextNode(character.salario));
    row.appendChild(colsalario);
    const colFechan=document.createElement('td');
    colFechan.appendChild(document.createTextNode(character.fechaN));
    row.appendChild(colFechan);

    body.appendChild(row)
}