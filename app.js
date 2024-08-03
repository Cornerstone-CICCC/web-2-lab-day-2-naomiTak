$(function() {
  
  // your code here
let userId = 0;
  build(1);

  function getUserById(id){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${id}`,
        type: "GET",
        success: function(response){
          resolve(response)
        },
        error: function(error){
          console.error("Error message", error)
          reject(error)
        }
      })  
    })
  }

  function getPostsById(id){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${id}/posts`,
        type: "GET",
        success: function(response){
          resolve(response)
        },
        error: function(error){
          console.error("Error message", error)
          reject(error)
        }
      })  
    })
  }

  function getPostsByPostId(postId){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/posts/${postId}`,
        type: "GET",
        success: function(response){
          resolve(response)
        },
        error: function(error){
          console.error("Error message", error)
          reject(error)
        }
      })  
    })
  }

  function getToDosById(id){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${id}/todos`,
        type: "GET",
        success: function(response){
          resolve(response)
        },
        error: function(error){
          console.error("Error message", error)
          reject(error)
        }
      })  
    })
  }

  //modal function
  async function callModal(postId){
    const postData = await getPostsByPostId(postId);
    const modul = document.createElement("div")
    const closeBtn = document.createElement("button")
    const overlay = document.createElement("div")

    const postTittle = document.createElement("div")
    postTittle.innerHTML = `<h3>${postData.title}</h3>`

    const postBody = document.createElement("div")
    postBody.innerHTML = `<p>${postData.body}</p>`

    const postViews = document.createElement("div")
    postViews.innerHTML = `<p>Views:${postData.views}</p>`

    modul.append(postTittle)
    modul.append(postBody)
    modul.append(postViews)
    modul.append(closeBtn)
    closeBtn.innerText = "Close Modal"
    modul.classList.add("modal")
    overlay.classList.add("overlay")
    overlay.append(modul)
    $(".container").append(overlay);
    $(".modal").find("button").on("click", function(){
      $(this).parents(".overlay").remove();
    })
  }
  async function build(id){
    userId = id;
    console.log(userId)
    const user = await getUserById(id)
      $("img").attr("src", user.image);
      $(".info__content").append(
        `<div><h3>${user.firstName} ${user.lastName}</h3></div>
        <div><strong>age:</strong><span> ${user.age}</span></dv>
        <div><strong>Email:</strong><span> ${user.email}</span></dv>
        <div><strong>Phone:</strong><span> ${user.phone}</span></dv>`
      );

      $(".posts").find("h3").text(`${user.firstName}'s Posts`);
      $(".todos").find("h3").text(`${user.firstName}'s To Dos`);
      
      const posts = await getPostsById(id);
      if(posts.total > 0){
        $.each(posts.posts, function( index, value ) {
          $(".posts").find("ul").append(
            `<li>
            <h4 post-id="${value.id}">${value.title}</h4>
            <div><p></p>${value.body}</div>
            </li>`
          )
        })

        $(".posts").find("h4").on("click", function(){
          callModal($(this).attr("post-id"))
        })
      }else{
        $(".posts").find("ul").append("<li>User has no posts</li>")
      }

      const toDos = await getToDosById(id);
      if(toDos.total > 0){
        $.each(toDos.todos, function( index, value ) {
          $(".todos").find("ul").append(`<li>${value.todo}</li>`)
        })
      }else{
        $(".todos").find("ul").append("<li>User has no todos</li>")
      }
      $(".todos").find("ul").hide();
  }

// Click events
  //Previous User button
  $("header :first-child").on("click", function(){
    //initialize data
    $(".info__content").children().remove();
    $(".posts").find("ul").children().remove();
    $(".todos").find("ul").children().remove();

    if(userId === 1){
      build(30);
    }else{
      build(userId - 1);
    }
  })

  //Next User button
  $("header :first-child").next().on("click", function(){
    //initialize data
    $(".info__content").children().remove();
    $(".posts").find("ul").children().remove();
    $(".todos").find("ul").children().remove();

    if(userId === 30){
      build(1);
    }else{
      build(userId + 1);
    }
  })

// click posts section
  $(".posts").find("h3").on("click", function(){
    $(this).next().slideToggle()
  })

  // click todos section
  $(".todos").find("h3").on("click", function(){
    $(".todos").find("ul").slideToggle()
  })

  $(".posts").find("h4").on("click", function(){
    console.log($(this))
  })

})