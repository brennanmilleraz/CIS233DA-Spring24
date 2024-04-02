function getMenu() {
    // set variables
    var url = window.location.pathname;
    var nav = document.getElementById('nav');

    // create menu tabs from menu array
    for (x = 0; x < aryMenu.length; x++) {

        // create new list item
        var li = document.createElement('li');

        // get page 
        var pageName = aryMenu[x][0];

        // set active status of tab
        if (url.indexOf(pageName) > 0) {
            li.setAttribute('class', 'active')
        } else {
            li.setAttribute('class', 'inactive')
        }

        // create anchor tag
        let a = document.createElement('a');
        a.href = aryMenu[x][0];
        a.innerText = aryMenu[x][1];

        // append anchor tag to li
        li.appendChild(a);

        //append li to ul
        nav.appendChild(li);
    }
}

function getSemester(){
    const semesterList = document.getElementById("semesterList");
    let semesterListOptions = '';
    semesterListOptions += '<option value="0">Select a Semester</option>';
    for(i=0;i<arySemesters.length;i++) {
        semesterListOptions += `<option value="${arySemesters[i][0]}">${arySemesters[i][1]}</option>`;
    }
    semesterList.innerHTML = semesterListOptions;
}

function getClass(obj) {
    var semesterID = obj.options[obj.selectedIndex].value;
    const aryClass = `ary${semesterID}`;
    const classList = document.getElementById('classList');

    let classListOptions = '';
    for(i=0;i<aryClass.length;i++) {
        classListOptions += `<option value="${i}">${aryClass[i][1]}</option>`;
    }
    classList.innerHTML = classListOptions;

}