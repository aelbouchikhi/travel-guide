const { getReviewsApi } = require("../API/getReviewsApi");

exports.getReviewsByLocationId = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await getReviewsApi(id)
        const data = response.data.data;
        // data.forEach(element => {
        //     console.log('------------------------------------')
        //     console.log(element);
        //     console.log('------------------------------------')
        // });
        const reviews = data.map(review => {
            // console.log(review.title);
            return {
                // avatar: review.user.avatar.large.url,
                // user_name: review.user.name,
                // user_location: review.user.user_location,
                // data_published: review.published_date,
                title: review.title,
                text: review.text,
                // rating_list: review.subratings,
                // reviews_images: review.photos.images.original.url
            }
        });
        res.json({Reviews: reviews})
    }catch(err){
        res.json({error: err.message})
    }
}