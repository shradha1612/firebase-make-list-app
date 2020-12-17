const cafeList= document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li')
    let name= document.createElement('span');
    let city= document.createElement('span');
    let cross=document.createElement('div');

    li.setAttribute('data-id', doc.id);  //id is on the top of doc not in data // in data then anything an be accessed by using data.id 
    name.textContent= doc.data().name;
    city.textContent=doc.data().city;
    cross.textContent= 'x';
    
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
          //event.target element of click and then we get the parent element of target i.e 'li'  and get id of data
          //when we click on x we get the id  and once we get id we use it to query our firestore to do paticular action
        db.collection('cafes').doc(id).delete()

        //db.collection go to documnet inside collection and pass id 
        
    })
}

//getting data
// db.collection('cafes').where('city', '==', 'wani').get().then((snapshot)=> {
// //where() - check for and add contitions

 //to arrange list in order
 //in firebase capital letter comes first

//  db.collection('cafes').where('city','==','lonavala').orderBy('name').get().then((snapshot)=> {
//     snapshot.docs.forEach(doc=>{
//     console.log(doc.data())
//     renderCafe(doc);
//     })
// });


//saving data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value='';
    form.city.value='';
})

//reat-time listener
//it is same as events exmaple-  onclick refresh 
//similarly - snapshot works 
db.collection('cafes').orderBy('city')
.onSnapshot(snapshot =>{
    let changes = snapshot.docChanges()
changes.forEach(change =>{
  //  console.log(change.doc.data())
  if(change.type== 'added'){
      renderCafe(change.doc)
  }else if(change.type == 'removed'){
  let li = cafeList.querySelector('[data-id=' + change.doc.id +']');
  cafeList.removeChild(li); 
}
})
})





