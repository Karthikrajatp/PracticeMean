app.controller('userController',function($scope,$http){
    $scope.title = "User Registration";
    $scope.username = 'maddy'
    $scope.password = 'pass'
    $scope.register = function(){
        console.log('register')
        var userData = {
            username:$scope.username,
            password:$scope.password
        }
        $http.post('/api/addUser', JSON.stringify(userData))
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    $scope.users = []
    $scope.show = function(){
        $http.get('/api/getUsers')
        .then((res)=>{
            $scope.users = res.data
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    $scope.status = "Not Logged In"
    $scope.login = function(){
        console.log('login')
        var userData = {
            username:$scope.username,
            password:$scope.password
        }
        $http.post('/api/login', JSON.stringify(userData))
        .then((res)=>{
            if (res.data){
                $scope.status = "Logged In"
            }else{
                $scope.status = "Not Logged In"
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }

})
