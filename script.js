
  
  const url ='https://67d52b75d2c7857431ef9256.mockapi.io/task1';
   const display=document.getElementById('display');

  const FetchTask=()=>{
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        RenderTask(data)
        console.log(data)
    }).catch(err => console.log(err))
  }

  FetchTask();


  const RenderTask=(task)=>{
   task.forEach(item =>{
    let element=document.createElement('div');
    element.className = 'col-lg-4 col-md-6 col-sm-10';
    element.innerHTML=
`
  <div class="card shadow-sm">
        <div class="card-body">
            <p class="fw-bold text-center">Name: <span class="text-primary">${item.name}</span></p>
            <p class="fw-bold text-center">University: <span class="text-primary">${item.university}</span></p>
            <p class="fw-bold text-center">Email: <span class="text-primary">${item.email}</span></p>
            <p class='text-center'>Graduation Completed: <span class='text-danger text-uppercase'>${item.Iscomplete}</span> </p>
            <div class="d-flex justify-content-center gap-5 mt-4 mb-4">
                <button class="edit-btn" data-id= '${item.id}'>Edit</button>
                <button class= "delete-btn" data-id='${item.id}'>Delete</button>
            </div>
       
    </div>
</div
`
display.appendChild(element);
    
})
   
//Edit and Delete Button control

document.querySelectorAll('.edit-btn').forEach((y)=>{
  y.addEventListener('click',(e)=>{
    const editId=e.target.dataset.id
    console.log(editId)
    window.location.href=`Edit.html?id=${editId}`;
  })
})



document.querySelectorAll('.delete-btn').forEach((x)=>{
  x.addEventListener('click',(e)=>{
    const deleteId=e.target.dataset.id;
    deleteItem(deleteId);
    console.log(deleteId);
  })
})

}

const deleteItem=(taskid)=>{
  let xhr=new XMLHttpRequest()
  xhr.open('DELETE',`${url}/${taskid}`,true)
  xhr.onload=function(){
    if(xhr.status==200){
      FetchTask();
      alert(`Task Deleted Succesfully`)
    }
 
  }
  xhr.send();
}

const addTask=({name,email,uni})=>{ 
     const xhr=new XMLHttpRequest();
     xhr.open("POST",url,true)
     xhr.setRequestHeader("Content-type","application/json")
     xhr.onload=function(){
      if(xhr.status == 201){
        alert('Task Added');
        FetchTask();
      }
     }
     xhr.send(JSON.stringify({name:name,email:email,university:uni,Iscomplete:false}))
}

const CreateTask=(e)=>{
  e.preventDefault();
 let name=document.getElementById('name').value;
 let email=document.getElementById('email').value;
  let uni=document.getElementById('uni').value;

  if(name && email && uni){
    addTask({name,email,uni});
    document.getElementById('name').value='';
    document.getElementById('email').value ='';
    document.getElementById('uni').value='';

      console.log('task found');
    }
    else{
      alert('No task Found');
    }
  }

const form = document.getElementById('form');
form.addEventListener('submit',CreateTask);