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
     'img': 'files/img/project/tomatoink.png',
     'category': 'CompAndSave Inc', 
     'name': '2015', 
     'title': 'Create an e-commerce website: tomatoink.com',
     'description': 'Built a new e-commerce website selling ink cartridges under Magento Platform.Created a new theme (Customize all of the website pages) and developed several extensions (Backend Optimization for business flow and our order operation). Worked with a designer, database operator, responsible for both front-end and backend implementation.',
     'icons': [
      { 'url': 'html5.png', 
        'name': 'HTML5'
      },
      { 'url': 'css3.png', 
        'name': 'CSS3'
      },
      { 'url': 'javascript.png', 
        'name': 'javascript'
      },
      { 'url': 'jQuery.png', 
        'name': 'jQuery'
      },
      { 'url': 'php.png', 
        'name': 'PHP'
      },
      { 'url': 'mysql.png', 
        'name': 'mySQL'
      },
      { 'url': 'magento.png', 
        'name': 'Magento'
      }
     ]
    },    
    {'url': '#',
     'img': 'files/img/project/autoship.png',
     'category': 'CompAndSave Inc', 
     'name': '2014', 
     'title': 'Autoship System',
     'description': 'Developed a system for our order operators to deal with small orders. It can extract all the satisfied orders and purchase ship labels based on their shipment method setting, and print ship labels, package lists, update order status and tracking number to our database, email customer for shipment (including fraud customer check and duplicate order checking)',
     'icons': [
      { 'url': 'html5.png', 
        'name': 'HTML5'
      },
      { 'url': 'css3.png', 
        'name': 'CSS3'
      },
      { 'url': 'javascript.png', 
        'name': 'javascript'
      },
      { 'url': 'php.png', 
        'name': 'PHP'
      },
      { 'url': 'mysql.png', 
        'name': 'mySQL'
      },
      { 'url': 'json.png', 
        'name': 'JSON'
      }
      ]
    },
    {'url': '#',
     'img': 'files/img/project/email_campaign.png',
     'category': 'CompAndSave Inc', 
     'name': '2014', 
     'title': 'Email Campaign Management',
     'description': 'Developed a system to sync email database with MailChimp through its API. Daily updates our new subscribers, email frequency updates to MailChimp Email List, and send back unsubscribes from MailChimp Email Campaigns. It can also generate email delivery rate, open rate and click rate based on email client reports for our marketing team. Tracking their next step after open the landing page, track transaction rate',
     'icons': [
      { 'url': 'html5.png', 
        'name': 'HTML5'
      },
      { 'url': 'css3.png', 
        'name': 'CSS3'
      },
      { 'url': 'javascript.png', 
        'name': 'javascript'
      },
      { 'url': 'jQuery.png', 
        'name': 'jQuery'
      },
      { 'url': 'php.png', 
        'name': 'PHP'
      },
      { 'url': 'mysql.png', 
        'name': 'mySQL'
      },
      { 'url': 'restful.png', 
        'name': 'RESTFUL'
      }
      ]   
    },
    {'url': '#',
     'img': 'files/img/project/product_report.png',
     'category': 'CompAndSave Inc', 
     'name': '2015', 
     'title': 'Product Report System',
     'description': 'Created a system to display and compare the selected products in a range of time. It will select and calculates the sales of selected product on each day and show customer with a chart. It can help our marketing to check and compare the sales of each product and make new plan for campaigns.',
     'icons': [
      { 'url': 'html5.png', 
        'name': 'HTML5'
      },
      { 'url': 'css3.png', 
        'name': 'CSS3'
      },
      { 'url': 'javascript.png', 
        'name': 'javascript'
      },
      { 'url': 'jQuery.png', 
        'name': 'jQuery'
      },
      { 'url': 'php.png', 
        'name': 'PHP'
      },
      { 'url': 'mysql.png', 
        'name': 'mySQL'
      },
      { 'url': 'angular.png', 
        'name': 'Angular'
      },
      { 'url': 'd3js.png', 
        'name': 'D3.js'
      }
      ]    
    },
    {'url': '#',
     'img': 'files/img/project/ispace.png',
     'category': 'North Carolina State University', 
     'name': '2013', 
     'title': 'Develop Graphic User Interface of iSpace',
     'description': 'Developed a graphic User Interface to operate iSpace(Intelligent Space: a platform contains several robots running on the map, eight cameras and a Base station to control all the robots). Improved robust of the system by fixing several bugs in the software, added new cameras and changed the structure of robot.',
     'icons': [
      { 'url': 'java.png', 
        'name': 'JAVA'
      },
      { 'url': 'ros.png', 
        'name': 'ROS'
      }
      ] 
    },
    {'url': '#',
     'img': 'files/img/project/email_system.png',
     'category': 'North Carolina State University', 
     'name': '2013', 
     'title': 'Login Security Project',
     'description':'Developed an email security system with an authentication verify mechanism, including a client, two servers. The client part could log in the server side and send or receive messages. Both servers could allow the user to log in or create new accounts. The email server could authenticate the legality of client by request check to authenticate server.',
     'icons': [
      { 'url': 'java.png', 
        'name': 'JAVA'
      }
      ]
    },

    {'url': '#',
     'img': 'files/img/project/customer_behavior.png',
     'category': 'CompAndSave Inc', 
     'name': '2014', 
     'title': 'Customer behavior tracking',
     'description': 'Created a tracking system to record the page customer landing. Then analytics the data, sending corresponding promotion emails to customer. one email for customer viewed a product without adding it in the cart, one email for abanded cart, one email for review the order and one email for promotions at the time we estimate this ink cartridge is empty.',
     'icons': [
      { 'url': 'javascript.png', 
        'name': 'javascript'
      },
      { 'url': 'jQuery.png', 
        'name': 'jQuery'
      },
      { 'url': 'php.png', 
        'name': 'PHP'
      },
      { 'url': 'mysql.png', 
        'name': 'mySQL'
      }
      ]   
    }
  ];
});