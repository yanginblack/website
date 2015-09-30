   if( ! $('#myCanvas').tagcanvas({
     textColour : '#2ECCFA',
     //outlineThickness : 1,
     height: 80, 
     maxSpeed : 0.08,
     depth : 0.9, 
     wheelZoom: false
   })) {
     // TagCanvas failed to load
     $('#myCanvasContainer').hide();
   }


var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectListCtrl', function($scope) {
  $scope.projects = [
    {'url': '#',
     'img': 'files/img/project/02.jpg',
     'category': 'category', 
     'name': 'project name', 
     'title': 'project title',
     'description': 'long text for project description.'
    },    
    {'url': '#',
     'img': 'files/img/project/02.jpg',
     'category': 'category', 
     'name': 'project name', 
     'title': 'project title',
     'description': 'long text for project description.'
    }
  ];
});