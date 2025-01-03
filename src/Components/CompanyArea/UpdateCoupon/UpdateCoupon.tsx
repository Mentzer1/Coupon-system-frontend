import { toast } from "react-toastify";
import { CouponModel } from "../../../models/Coupon";
import { getCompanyCouponsApi, updateCouponApi } from "../../../services/CompanyService";
import "./UpdateCoupon.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Category } from "../../../models/Category";
import { authStore } from "../../../redux/AuthStore";

export function UpdateCoupon(): JSX.Element {

    const [selectValue, setSelectValue] = useState<string>(Category.FOOD);
    const { register, handleSubmit, setValue } = useForm<CouponModel>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);

    const couponImages = {
        cinema: "https://media.istockphoto.com/id/1494642262/photo/people-in-the-cinema-auditorium-with-empty-white-screen.jpg?s=612x612&w=0&k=20&c=wiVYHafqEAlvufaCpOTZhn9wuklrgKHdDHWqpmMGhjw=",
        food: "https://media.istockphoto.com/id/1155240408/photo/table-filled-with-large-variety-of-food.jpg?s=612x612&w=0&k=20&c=uJEbKmR3wOxwdhQR_36as5WeP6_HDqfU-QmAq63OVEE=",
        fashion: "https://media.istockphoto.com/id/940236760/photo/catwalk-runway-show-event.jpg?s=612x612&w=0&k=20&c=xhluwJbXAmKVwoffVEk8JlfWfsIpTpTNlRtlwXcnV4Y=",
        spa: "https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.jpg?s=612x612&w=0&k=20&c=yrNXIAA1mSSzypzbKMTl4807nRG4S8rs5RsWb-J0M9U=",
        tech: "https://s.wsj.net/public/resources/images/ON-CB801_chip_B620_20170405183838.jpg",
        sport: "https://t4.ftcdn.net/jpg/00/04/43/79/360_F_4437974_DbE4NRiaoRtUeivMyfPoXZFNdCnYmjPq.jpg"
    }
    
    useEffect(() => {
        if (id) {
            getCompanyCouponsApi()
                .then((coupons) => {
                    const coupon = coupons.find((c) => c.id === Number(id));
                    if (coupon) {
                        setValue("category", coupon.category);
                        setValue("title", coupon.title);
                        setValue("description", coupon.description);
                        setValue("startDate", coupon.startDate);
                        setValue("endDate", coupon.endDate);
                        setValue("amount", coupon.amount);
                        setValue("price", coupon.price);
                        setValue("image", coupon.image);
                    } else {
                        toast.error("Coupon not found");
                        navigate("/company/coupons");
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching coupons:", err);
                    setLoading(false);
                });
        }
    }, [id, setValue, navigate]);
    
    function sendCoupon(updatedCoupon: CouponModel) {
        switch (updatedCoupon.category){
            case Category.CINEMA:
                updatedCoupon.image = couponImages.cinema;
                break;
            case Category.FOOD:
                updatedCoupon.image = couponImages.food;
                break;
            case Category.FASHION:
                updatedCoupon.image = couponImages.fashion;
                break;
            case Category.SPA:
                updatedCoupon.image = couponImages.spa;
                break;
            case Category.TECH:
                updatedCoupon.image = couponImages.tech;
                break;
            case Category.SPORT:
                updatedCoupon.image = couponImages.sport;
                break;    
        }

        updatedCoupon.id = Number(id);
        updatedCoupon.companyID = authStore.getState().id;
    
        updateCouponApi(updatedCoupon)
            .then((res) => {
                toast("Coupon updated! The status is: " + res.status);
                navigate("/coupons");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (loading) {
        return <div>Loading...</div>; 
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectValue(event.target.value);
    }

    return (
        <div className="UpdateCoupon">
            <form onSubmit={handleSubmit(sendCoupon)}>
            <select
                    {...register("category")}
                    value={selectValue}
                    onChange={handleSelectChange}
                >
                    <option value={Category.FOOD}>{Category.FOOD}</option>
                    <option value={Category.FASHION}>{Category.FASHION}</option>
                    <option value={Category.CINEMA}>{Category.CINEMA}</option>
                    <option value={Category.SPA}>{Category.SPA}</option>
                    <option value={Category.TECH}>{Category.TECH}</option>
                    <option value={Category.SPORT}>{Category.SPORT}</option>
                </select><br />
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                /><br />
                <input
                    type="text"
                    placeholder="Description"
                    {...register("description", { required: "Description is required" })}
                /><br />
                Start Date: <input
                    type="date"
                    {...register("startDate")}
                /><br />
                End Date: <input
                    type="date"
                    {...register("endDate")}
                /><br />
                <input
                    type="number"
                    placeholder="Amount"
                    {...register("amount", { required: "Amount is required" })}
                /><br />
                <input
                    type="number"
                    placeholder="Price"
                    step={"0.01"}
                    {...register("price", { required: "Price is required" })}
                /><br />                
                
                <button type="submit">Update</button>
            </form>
			
        </div>
    );
}
