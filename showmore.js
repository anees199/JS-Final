  const data = localStorage.getItem('id');
        console.log(data);

        const div1 = document.querySelector(".containerdiv");
        const reviews = document.querySelector(".reviews");


        fetch(`https://dummyjson.com/products/${data}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);

                div1.innerHTML = `
                 <div class=" card cart-container">
                <img src=${res.thumbnail} alt="">
                <h1>${res.title}</h1>
                <h1>${res.price}</h1>
                <h1>${res.description}</h1>
                </div>
                `

                // res.reviews.map(item => {
                //     reviews.innerHTML += `
                //     <h3>Rating ${item.rating}</h3>
                //     <h3>Name ${item.reviewerName}</h3>
                //     `
                // })
            })
            .catch(err => console.log(err))