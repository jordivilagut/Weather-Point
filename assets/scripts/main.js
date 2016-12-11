var wpApp = angular.module('wpApp', []);

wpApp.controller('wpController', function($scope, $http){

    $scope.images = {
        "01d": "assets/images/sunlight.jpg",
        "01n": "assets/images/clearnight.jpg",
        "02d": "assets/images/clouds.jpg",
        "02n": "assets/images/nightclouds.jpg",
        "03d": "assets/images/darkclouds.jpg",
        "03n": "assets/images/nightdarkclouds.jpg",
        "04d": "assets/images/darkclouds.jpg",
        "04n": "assets/images/nightdarkclouds.jpg",
        "09d": "assets/images/rain.jpg",
        "09n": "assets/images/nightrain.jpg",
        "10d": "assets/images/rain.jpg",
        "10n": "assets/images/nightrain.jpg",
        "11d": "assets/images/storm.jpg",
        "11n": "assets/images/nightstorm.jpg",
        "13d": "assets/images/snow.jpg",
        "13n": "assets/images/nightsnow.jpg",
        "50d": "assets/images/mist.jpg",
        "50n": "assets/images/nightmist.jpg"
    }
    
    $scope.setBackground = function() {
        document.body.style.background = "url(" + $scope.backgroundImg + ")";
    }

    $scope.storeWeatherData = function(data) {
        $scope.weatherData = data;
        $scope.city = data.name;
        $scope.country = data.sys.country;
        $scope.temp = data.main.temp;
        $scope.temperature = Math.round(data.main.temp - 273.149994) + "ºC";
        $scope.farenheit = Math.round($scope.temperature * 1.8 + 32) + "ºF";
        $scope.description = data.weather[0].description;
        $scope.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $scope.backgroundImg = $scope.images[data.weather[0].icon];
        $scope.humidity = data.main.humidity + "%";
        $scope.pressure = data.main.pressure + " hPa";
        $scope.setBackground();
    }

    $scope.getWeatherData = function() {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + $scope.lat + "&lon=" + $scope.lon + "2&appid=d5176468543e7e1b49ab1c47a422ef79";

        $http.get(url)
            .then(function(response) {
            $scope.storeWeatherData(response.data);
        });
    };

    $scope.getLocation = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.lat = position.coords.latitude;
            $scope.lon = position.coords.longitude;
            $scope.getWeatherData();
        });
    }

    $scope.getLocation();

    $scope.setMetric = function() {
        $scope.temperature = Math.round($scope.temp - 273.149994) + "ºC";
    }
    
    $scope.setImperial = function() {
        $scope.temperature = Math.round($scope.temp * 1.8 - 459.67) + "ºF";
    }
});