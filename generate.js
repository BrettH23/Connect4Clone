window.onload = function(){
    var height = 4;
    var width = 9;

    var vh = 70;
    var vw = (vh*width)/height;

    var bod = document.querySelector('body');

    tabl = document.createElement('table');
    tabl.setAttribute('id','bigtable');
    tabl.style.height = vh + 'vh';
    tabl.style.width = vw + 'vh';
    
    tabr = document.createElement('tr');
    
    for(let i = 0;i<width;i++){
        column = document.createElement('td');
        contents = document.createElement('table');
        for(let j=0;j<height;j++){
            blockrow = document.createElement('tr');
            blockdata = document.createElement('td');
            
            blockdata.setAttribute('class','square');
            blockdata.innerHTML = j + (i*width);
            //blockdata.style.height = vh + "vw";
            //blockdata.style.width = vh + "vw";

            blockrow.appendChild(blockdata);
            contents.appendChild(blockrow);
        }
        column.appendChild(contents);
        tabr.appendChild(column);
    }
    tabl.appendChild(tabr);

    bod.appendChild(tabl);
}

