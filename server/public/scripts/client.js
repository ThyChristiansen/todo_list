$(document).ready(readyNow);
function readyNow(){
    console.log("JQ");
    $('#addBtn').on('click',addClick);

}

function addClick(){
    console.log('addBtn clicked!');
    
}

function refrestTask(){
    console.log('in refrestTask');
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then((response)=>{
        console.log('from GET', response);
        // renderToDOM();
    }).catch((err) =>{
        console.log('Error in GET',err);
    })
}

// function renderToDOM(tasks){
//     let el = $('#inputTask').val();
//     el.empty();
//     for (let i of tasks ){
//         el.appent(`<li>i.</li>`)

//     }
// }
