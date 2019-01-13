function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/signin/google',
        data: {
        id_token
        }
    })
    .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data)
        isLogin()
    })
    .catch((err) => {
        console.log(err)
    })
    
}

function login(user) {
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/login',
        data: user
    })
    .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data)
        isLogin()
    })
    .catch((err) => {
        console.log(err)
    })
}

function register(user) {
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/register',
        data: user
    })
    .then(({ data }) => {
        console.log(data)
        // localStorage.setItem('token', data)
        // isLogin()
    })
    .catch((err) => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear();
      isLogin();
    }); 
}

function getTodo() {
    let token = localStorage.getItem('token')
    axios.get('http://localhost:3000/api/todo', {
        headers : {token}
    })
    .then(({data}) => {
        $('#todolist').empty()
        let i = 0
        if(!data.data.length){
            $('#todolist').append(`
            <h1>Create Your New Project</h1>
            `)
        } else {
            data.data.forEach(todo => {
                if(i % 3 == 0) {
                    $('#todolist').append(`
                        <div class="card-deck" id="todo${Math.floor(i / 3)}">
                            <div class="card">
                                <div class="card-body">
                                <h5 class="card-title">${todo.name}</h5>
                                <p class="card-text">${todo.description}</p>
                                </div>
                                <div class="card-footer">
                                <div class="container">
                                    <div class="row">
                                        <small class="text-muted"><a href="#" class="updatetodo" onclick="updateTodo('${todo._id}', '${todo.name}')">Update |</a></small>
                                        <small class="text-muted"><a href="" class="deleteTodo" onclick="deleteTodo('${todo._id}')">| Delete</a></small>
                                    </div>
                                </div>
                                <small class="text-muted">Status:${todo.status}, </small>
                                <small class="text-muted">Due Date:${todo.due_date.substring(0, 10)}</small>
                                </div>
                            </div>
                        </div>
                    `)
                } else {
                    $(`#todo${Math.floor(i / 3)}`).append(`
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">${todo.name}</h5>
                            <p class="card-text">${todo.description}</p>
                            </div>
                            <div class="card-footer">
                            <div class="container">
                                <div class="row">
                                    <small class="text-muted"><a href="#" class="updatetodo" onclick="updateTodo('${todo._id}', '${todo.name}')">Update |</a></small>
                                    <small class="text-muted"><a href="" class="deleteTodo" onclick="deleteTodo('${todo._id}')">| Delete</a></small>
                                </div>
                            </div>
                            <small class="text-muted">Status:${todo.status}, </small>
                            <small class="text-muted">Due Date:${todo.due_date.substring(0, 10)}</small>
                            </div>
                        </div>
                        `)
                    }
                i++ 
            })
            $('.deleteTodo').click(function(event) {
                event.preventDefault()
            })
            $('.updatetodo').click(function(event) {
                event.preventDefault()
            })
        }

        $('#searchInput').keydown(function(){
            $('#todolist').empty()
            let i = 0
            let dataSearch = data.data.filter( name => {
              const regex = new RegExp(`.*${$('#searchInput').val()}.*`, 'i');
              return regex.test (name.name) 
            })
            dataSearch.forEach(todo => {
                if(i % 3 == 0) {
                    $('#todolist').append(`
                        <div class="card-deck" id="todo${Math.floor(i / 3)}">
                            <div class="card">
                                <div class="card-body">
                                <h5 class="card-title">${todo.name}</h5>
                                <p class="card-text">${todo.description}</p>
                                </div>
                                <div class="card-footer">
                                <div class="container">
                                    <div class="row">
                                        <small class="text-muted"><a href="#" class="updatetodo" onclick="updateTodo('${todo._id}', '${todo.name}')">Update |</a></small>
                                        <small class="text-muted"><a href="" class="deleteTodo" onclick="deleteTodo('${todo._id}')">| Delete</a></small>
                                    </div>
                                </div>
                                <small class="text-muted">Status:${todo.status}, </small>
                                <small class="text-muted">Due Date:${todo.due_date.substring(0, 10)}</small>
                                </div>
                            </div>
                        </div>
                    `)
                } else {
                    $(`#todo${Math.floor(i / 3)}`).append(`
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">${todo.name}</h5>
                            <p class="card-text">${todo.description}</p>
                            </div>
                            <div class="card-footer">
                            <div class="container">
                                <div class="row">
                                    <small class="text-muted"><a href="#" class="updatetodo" onclick="updateTodo('${todo._id}', '${todo.name}')">Update |</a></small>
                                    <small class="text-muted"><a href="" class="deleteTodo" onclick="deleteTodo('${todo._id}')">| Delete</a></small>
                                </div>
                            </div>
                            <small class="text-muted">Status:${todo.status}, </small>
                            <small class="text-muted">Due Date:${todo.due_date.substring(0, 10)}</small>
                            </div>
                        </div>
                        `)
                    }
                i++ 
            })
        })
    })
    .catch(err => {
        console.log(err);
    })
}

function deleteTodo(deleteId) {
    let token = localStorage.getItem('token')
    axios({
        method: "DELETE",
        url: `http://localhost:3000/api/todo/${deleteId}`,
        headers: {token}
    })
    .then(data => {
        console.log(data);
        getTodo()
    })
    .catch(err => {
        console.log(err);
    })
}

function updateTodo(_id, name) {
    let id = _id
    $('#cutodo').empty()
    $('#cutodo').append(`
    <p>
        <a class="btn btn-primary" id="createproject" data-toggle="collapse" href="#update" role="button"
        aria-expanded="false" aria-controls="update">
        Update Project ${name}
        </a>
    </p>
    <div class="collapse" id="update">
        <div class="card card-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                    <label for="inputProject">Project Name</label>
                    <input type="text" class="form-control" name="name" id="projectName" aria-describedby="projectHelp"
                    placeholder="Project name">
                    <small id="projectHelp" class="form-text text-muted">Enter your project name</small>
                </div>
                <div class="form-group">
                    <label for="projectDescription">Description</label>
                    <textarea class="form-control" id="projectDescription" rows="5"></textarea>
                </div>
                <div class="form-group">
                    <label class="control-label" for="date">Due Date</label>
                    <input class="form-control" id="projectdueDate" name="date" placeholder="MM/DD/YYY" type="text"/>
                </div>
                <div class="form-group"> 
                    <button class="btn btn-primary " id="updateprojectButton" name="submit" type="submit">Submit</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `)

    $(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        var options={
          format: 'mm/dd/yyyy',
          container: container,
          todayHighlight: true,
          autoclose: true,
        };
        date_input.datepicker(options);
      })
    $('#updateprojectButton').click(function(event) {
        event.preventDefault()
        let name = $('#projectName').val()
        let due_date = $('#projectdueDate').val()
        let description = $('#projectDescription').val()
        let input = {name, due_date, description}
        updateProject(id, input)
        getTodo()
        $('#projectName').val('')
        $('#projectdueDate').val('')
        $('#projectDescription').val('')
    })
}

function updateProject(id, input) {
    let token = localStorage.getItem('token')
    axios({
        method: "PUT",
        url: `http://localhost:3000/api/todo/${id}`,
        headers: {token},
        data: input
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}
function createProject(input) {
    let token = localStorage.getItem('token')
    axios({
        method: "POST",
        url: 'http://localhost:3000/api/todo',
        headers: {token},
        data: input
    })
    .then(data => {
        console.log(data);
        getTodo()
    })
    .catch(err => {
        console.log(err);
    })
}

function isLogin() {
    let token = localStorage.getItem('token');
    if (token) {
      $('#loginpage').hide()
      $('#header').show()
      $('#g-signout').show()
      $('#content').show()
      $('.footer').hide()
    } else {
      $('#loginpage').show()
      $('#header').hide()
      $('#g-signout').hide()
      $('#content').hide()
      $('.footer').show()
    }
}
