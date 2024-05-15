function add_dynamicelements (innerhtml,container_id,method='div')
{
    switch(method){
        case 'div':
        const container = document.getElementById(container_id);
        const div = document.createElement('div');
        div.innerHTML = innerhtml;
        container.appendChild(div); 
    }   
}

export{add_dynamicelements};