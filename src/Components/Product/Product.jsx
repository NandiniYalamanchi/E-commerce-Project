import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import './Product.scss'
const Product = ({product}) => {
    return (
        <div className='product-cont' >
            <div className='rating-img-cont' >
                {
                    product.product_images ? <img src={product?.product_images[0]?.image} alt="" className='product-image' /> : <p className='absolute top-0' >Not Available</p> 
                }
                {/* <img src={product?.product_images[0]?.image} alt="" className='product-image' /> */}
                <p >4.0 <span className='scale-75 text-[#12958f]' ><StarIcon /></span> </p>
            </div>
            <p className='font-bold' >{product.brand_name}</p>
            <p className=' text-[#94979f] ' >{product.vendor_article_name}</p>
            <div className='price-cont' > 
                <p className='font-bold' >Rs {product.final_price}</p>
                <p className='text-sm text-[#94979f]' > <del>Rs {product.discount_amount}</del> </p>
                <p className='text-red-500 text-sm' >({product.discount_percent}% off)</p>
            </div>
            <button className='bg-[#12958f] p-2 rounded-lg text-white mt-2 ' >Buy Now</button>
        </div>
    )
}

export default Product