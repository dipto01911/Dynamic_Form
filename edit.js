
let url ='https://67d52b75d2c7857431ef9256.mockapi.io/task1';

const id=new URLSearchParams(window.location.search).get('id');

let form_edit=document.getElementById('edit_form');
let edit_name=document.getElementById('edit_name');
let edit_email=document.getElementById('edit_email');
let edit_uni=document.getElementById('edit_uni');

fetch(`${url}/${id}`)
.then(res  => res.json())
.then(data => {
console.log(data);
 edit_name.value=data.name;
 edit_email.value=data.email;
 edit_uni.value=data.university;

}).catch(err => console.log(err))


form_edit.addEventListener('submit',(e)=>{
 e.preventDefault();

 let update_name=edit_name.value;
 let update_uni=edit_uni.value;
 if(update_name && update_uni){

    fetch(`${url}/${id}`,{
        method:'PUT',
        body:JSON.stringify({name:update_name,university:update_uni}),
        headers:{'Content-Type':'application/json'},
    }).then(res =>res.json())
       .then(()=>{
        alert('Updated Successfully')
        window.location.href='index.html';
       }).catch(err =>{
        console.log(`Something went error ${err}`);
       })

 }else{
    alert('No Task Found');
 }
})


document.getElementById('GoBack').addEventListener('click',function(){
    window.location.href='index.html'
})