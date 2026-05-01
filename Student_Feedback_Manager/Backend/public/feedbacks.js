const container = document.getElementById('container');

addEventListener('load',async(e)=>{
    console.log("fetching...")
    try{
        const response = await fetch('https://phase-6.vercel.app/feedbacks');
        const data = await response.json();
        container.innerHTML = data.map((feedback)=>{
            const comment = feedback.comment && feedback.comment.trim()
                ? feedback.comment
                : 'No comment provided';

            return `
            <div class="card">
                <h3>${feedback.name}</h3>
                <div>${feedback.rating}</div>
                <p>${comment}</p>
                <span>${feedback.createdAt}</span>
            </div>
            `;
        }).join('');


    }catch(err){
        console.log(err)
    }
})