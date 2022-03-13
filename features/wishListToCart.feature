@webShop
Feature: Add Items to Wishlist and then to Cart

  Background: Navigation
    Given When I launch online shopping application

  Scenario: Web automation task
    When I should select shopping page
    Then I should select 4 product from shopping page
    When I should view my wishlist table
     Then I should get 4 selected items in my wishlist
     When I search for lowest price product from wishlisht
     Then I am able to add the lowest price item to my cart
     Then I am able to verify the item in my cart
    
