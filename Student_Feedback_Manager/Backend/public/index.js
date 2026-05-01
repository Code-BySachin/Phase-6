const elements = {
    name: document.getElementById('name'),
    rating:document.querySelectorAll('.rating'),
    comment: document.getElementById('comment'),
    submit: document.getElementById('submit'),
    "feedbacks-btn": document.getElementById('feedbacks-btn')
}

let name  = '';
let rating='';
let comment = '';

elements["feedbacks-btn"].addEventListener('click',(e)=>{
    window.location.href = "/feedbacks.html";
})

elements["name"].addEventListener('input',(e)=>{
    name =  e.target.value;
})
console.log(elements["rating"])

elements["rating"].forEach((element)=>{
    element.addEventListener('click',(e)=>{
        rating=e.target.value;
    })
})

elements["comment"].addEventListener('click',(e)=>{
        comment=e.target.value;
    })

async function sendFeedback(name,rating,comment){
    try{

        const response = await fetch("http://localhost:3000/feedback-submit",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify({
                name,
                rating,
                comment
            })
            
        })

        console.log(response)
    }catch(err){
         console.log(err);
    }

}
console.log(elements['submit'])
elements['submit'].addEventListener('click',async (e)=>{
    e.preventDefault();
    console.log("submitting...")
    console.log(e.target)
    e.target.value = 'Submitting...'
    await sendFeedback(name,rating,comment);
    e.target.value = 'Submit'

})


