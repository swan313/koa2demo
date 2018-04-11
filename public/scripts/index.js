const getBooks = () => {
    axios.get(`/set-books`)
        .then(function (response) {
            console.log(response);
            let books = response.data;

            $('#JS-books-table tbody').html(
                books.map((book) => {
                    return (
                        "<tr>" +
                        "<td>" + book.id + "</td>" +
                        "<td>" + book.name + "</td>" +
                        "<td>" + book.age + "</td>" +
                        "<td>" + book.addtime + "</td>" +
                        "<td>" +
                        "<a class='btn btn-default btn-sm mr-10' onclick='getDataL(" + book.id + ")'>编辑</a>" +
                        "<div data-id='" + book.id + "' class='btn btn-danger btn-sm ml-10 JS-delete-book' onclick='del(" + book.id + ")'>删除</div>" +
                        "</td>" +
                        "</tr>"
                    )
                }).join('')
            );
        })
        .catch(function (error) {
            console.log(error);
        });
};

getBooks();

//删除一条数据   href='edit?id=" + book.id + "
function del(id){
    let par = {
        params: {id: id}
    };
    axios.get('/del', par)
        .then(function (response) {
            console.log(response);
            window.location.href = "/list";
        })
        .catch(function (error) {
            console.log(error);
        });
}


/*function addBooks() {
    let par = {
        name: $(" input[ name='name' ] ").val(),
        sex: $(" textarea[ name='sex'] ").val(),
        age: $(" input[ name='age'] ").val()
    };
    console.log(par);

    axios.post('/add-book', par)
        .then(function (response) {
            console.log(response);
            window.location.href = "/list";
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateBooks() {
    let par = {
        name: $(" input[ name='name' ] ").val(),
        sex: $(" textarea[ name='sex'] ").val(),
        age: $(" input[ name='age'] ").val()
    };
    console.log(par);

    axios.post('/update-book', par)
        .then(function (response) {
            console.log(response);
            // window.location.href = "/list";
        })
        .catch(function (error) {
            console.log(error);
        });
}*/

//添加、修改一条数据
function dataL(url,par){
    axios.post(url, par)
        .then(function (response) {
            console.log(response);
            window.location.href = "/list";
            document.cookie = 'id' + "=" + '';
            document.cookie = 'name' + "=" + '';
            document.cookie = 'sex' + "=" + '';
            document.cookie = 'age' + "=" + '';
        })
        .catch(function (error) {
            console.log(error);
        });
}

//获取一条数据
function getDataL(id){
    let par = {
        params: {id: id}
    };
    axios.get('/get-data', par)
        .then(function (response) {
            let data = {
                id: response.data[0].id,
                name: response.data[0].name,
                sex: response.data[0].sex,
                age: response.data[0].age
            };

            document.cookie = 'id' + "=" + escape(data.id);
            document.cookie = 'name' + "=" + escape(data.name);
            document.cookie = 'sex' + "=" + escape(data.sex);
            document.cookie = 'age' + "=" + escape(data.age);
            window.location.href = "/edit";
        })
        .catch(function (error) {
            console.log(error);
        });
}


$('#add-book').click(function () {
    let par = {
        name: $(" input[ name='name' ] ").val(),
        sex: $(" input[ name='sex'] ").val(),
        age: $(" input[ name='age'] ").val()
    };
    dataL('/add-book', par);
});

$('#update-book').click(function () {

    let par = {
        name: $(" input[ name='name' ] ").val(),
        sex: $(" input[ name='sex'] ").val(),
        age: $(" input[ name='age'] ").val(),
        id: getCookie('id')
    };
    console.log(par);
    dataL('/update-book/', par);
});


//写cookies
function setCookie(c_name, value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 2 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
