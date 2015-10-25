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
    {'url': '/tomatoink',
     'hasurl': true, 
     'img': 'files/img/project/tomatoink.jpg',
     'category': 'CompAndSave Inc', 
     'name': '2015', 
     'title': 'Tomatoink.com (e-commerce website)',
     'description': 'Built an e-commerce website under Magento Platform. Created a new theme (Customized all the pages) and developed several extensions (Backend Optimization for business flow and order filter, customer service ticket system). Worked as team leader with a designer and a database engineer, responsible for both front-end and backend implementation.',
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
    {'url': '/autoship',
     'hasurl': true, 
     'img': 'files/img/project/autoship.png',
     'category': 'CompAndSave Inc', 
     'name': '2014', 
     'title': 'Autoship System',
     'description': 'Developed a web application for our staffs to automatically ship orders. It can extract current satisfied orders, organize and classify orders, then purchase ship labels and print package lists, update order status and tracking number to database,  and email customer informing shipment — including fraud customer filter and duplicate order checking',
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
     'img': 'files/img/project/customer_behavior.jpg',
     'category': 'CompAndSave Inc', 
     'name': '2014', 
     'title': 'Customer behavior tracking',
     'description': 'Created a tracking system to record customer’s behavior on our website. Then analytics data for sending corresponding promotion emails to customers. The tracking system will record every step customer takes while on our website, how long he/she stays there and which products they are looking at or adding to the cart. If they leave without purchase, we will send coupon code in the reminder email.',
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
    }, 
    {'url': '#',
     'img': 'files/img/project/product_report.jpg',
     'category': 'CompAndSave Inc', 
     'name': '2015', 
     'title': 'Product Report System',
     'description': 'Created a system for our marketing team to search and select products for sales report. It can compare with other products, change date range and show corresponding campaigns and coupon code customers were using.',
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
     'img': 'files/img/project/ispace.jpg',
     'category': 'North Carolina State University', 
     'name': '2013', 
     'title': 'Develop Graphic User Interface of iSpace',
     'description': 'Made an User Interface for iSpace -- which is an indoor Robot Control Platform for testing algorithms of control and energy saving. Using Java Swing for the interface building, and create a copy under ROS (Robot Operating System).',
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
     'img': 'files/img/project/email_campaign.jpg',
     'category': 'CompAndSave Inc', 
     'name': '2014', 
     'title': 'Email Campaign Management',
     'description': 'Developed a system to sync our local database of subscribers with MailChimp through its API. Daily updates new subscribers, email frequency updates to MailChimp Email List, and send back unsubscribes from MailChimp Email Campaigns. It can also generate report of email delivery rate, open rate and click rate for marketing team.',
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
    }
  ];

  $scope.games = [
    {
      'url' : '/snow', 
      'category': '2014', 
      'title': 'Snow Flake Game', 
      'name': 'Javascript jQuery HTML5 CSS3',  
      'img' : 'files/img/games/snow.png', 
      'description' : 'A small javascript game, players can create six different type of snowflake which will follow the movement of mouse, in the mean while there is a delay added to the edge of each snowflake, which is a beautiful relaxing scense.'
    }, 
    {
      'url' : '/MemoryGame', 
      'category': '2015', 
      'title': 'Memory Game', 
      'name': 'Javascript AngularJS Socket.io', 
      'img' : 'files/img/games/memory.png', 
      'description' : 'An AngularJS game, player should memorize the cards position by keep mathcing them with pairs. And this game allow player to practice by himself, play with friend online or play with AI. Also it includes a chat room. ' 
    }
  ];
});