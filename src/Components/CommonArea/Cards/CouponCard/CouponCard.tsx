import { useEffect, useState } from "react";
import { CouponModel } from "../../../../models/Coupon";
import "./CouponCard.css";
import { getCompanyNameApi, purchaseCouponApi } from "../../../../services/CustomerService";
import { deleteCouponApi } from "../../../../services/CompanyService";
import { authStore } from "../../../../redux/AuthStore";
import { ClientType } from "../../../../models/ClientType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CouponProps{
    coupon: CouponModel;
    showDeleteButton?: boolean;
    showUpdateButton?: boolean;
    showPurchaseButton?: boolean;
    setCoupons?: React.Dispatch<React.SetStateAction<any>>;

}

export function CouponCard(props: CouponProps): JSX.Element {

    const navigate = useNavigate();
    

    const startDate = new Date(props.coupon.startDate);
    const endDate = new Date(props.coupon.endDate);

    const [companyName, setCompanyName] = useState<string>("N/A");


    useEffect(() =>{

        if(authStore.getState().name !== "" && authStore.getState().role === ClientType.Company) {
            setCompanyName(authStore.getState().name)
        } else{

        getCompanyNameApi(props.coupon.companyID)
        .then((res) => {
            console.log("API Response:", res);
            setCompanyName(res);
        })
        .catch((e) => {
            console.log(e);
        })
    }
}, [])
    
    
    function handleDeleteCoupon(couponId: number) {
        deleteCouponApi(couponId);
        toast("Coupon deleted!")        
        console.log("Delete coupon with ID:", couponId);
        if (props.setCoupons) {
            props.setCoupons((prev: CouponModel[]) => prev.filter(coupon => coupon.id !== couponId));
        }
    }
    
    function handleEditCoupon(coupon: CouponModel) {
        navigate("/update_coupon/" + props.coupon.id)
    }

    function handlePurchaseCoupon(coupon: CouponModel) {
        purchaseCouponApi(coupon)
        .then((res) => {
            toast("You have purchase the coupon: " + coupon.title);
            if(props.setCoupons){
                props.setCoupons((prev: CouponModel[]) => 
                    prev.map((c) => 
                        c.id === res.id ? res : c // update the coupon with the same id
                    )
                );
            }
    
        })
        .catch((err) => {
            alert(err.response.data)
            console.log(err);
        });

    }


    return (
        <div className="CouponCard">
			<p>
                <img src={props.coupon.image} alt={props.coupon.title} /><br/>
                {props.coupon.title}<br/>
                Category: {props.coupon.category}<br/>
                Company: {companyName}<br/>
                Amount: {props.coupon.amount}<br/>
                {props.coupon.description}<br/>
                Start date: {startDate.toDateString()} <br />
                End date: {endDate.toDateString()} <br />
                Price: {props.coupon.price}<br/>
                {props.showDeleteButton &&<button onClick={() => handleDeleteCoupon(props.coupon.id)}>❌</button>}
                {props.showUpdateButton &&<button onClick={() => handleEditCoupon(props.coupon)}>✏️</button>}
                {props.showPurchaseButton &&<button onClick={() => handlePurchaseCoupon(props.coupon)}>Purchase</button>}

            </p>

        </div>
    );
}
