const container = document.getElementById('container');

addEventListener('load',async(e)=>{
    console.log("fetching...")
    try{
        const response = await fetch('http://localhost:3000/feedbacks');
        const data = await response.json();
        data.map((data)=>{
            container.innerHTML += `
            <div class="card">
                <h3>${data.name}</h3>
                <div>${data.rating}</div>
                <p>${data.comment}</p>
                <span>${data.createdAt}</span>
            </div>
            `
        })


    }catch(err){
        console.log(err)
    }
})