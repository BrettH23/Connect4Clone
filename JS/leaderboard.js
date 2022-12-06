
var data;
function leaderboard(x) {
    let httpRequest = new XMLHttpRequest();
    orderby = "order=" + x;
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) { 
                data = JSON.parse(this.responseText);
                displayData();
            }
            else {
                alert('There was a problem with the request.');
            }
        }
    };
    httpRequest.open("POST", "../php/leaderboard.php");
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send(orderby);
}

function displayData() {
    let table = document.getElementById('leaderboardtable')
    let tbody = document.getElementById('tablebody');
    table.removeChild(tbody);
    let newtbody = document.createElement('tbody');
    newtbody.id = "tablebody";
    table.appendChild(newtbody);
    for (let i = 0; i < Object.keys(data).length; ++i) {
        let row = document.createElement('tr');
        let username = document.createElement('td');
        let gamesWon = document.createElement('td');
        let timePlayed = document.createElement('td');
        let gamesPlayed = document.createElement('td');
        let gamesLost = document.createElement('td');
        username.innerHTML = data[i]['username'];
        gamesWon.innerHTML = data[i]['gamesWon'];
        timePlayed.innerHTML = data[i]['timePlayed'];
        gamesPlayed.innerHTML = data[i]['gamesPlayed'];
        gamesLost.innerHTML = data[i]['gamesLost'];
        
        row.appendChild(username);
        row.appendChild(gamesWon);
        row.appendChild(timePlayed);
        row.appendChild(gamesPlayed);
        row.appendChild(gamesLost);
        
        document.getElementById('tablebody').appendChild(row);
    }
}

leaderboard(0);