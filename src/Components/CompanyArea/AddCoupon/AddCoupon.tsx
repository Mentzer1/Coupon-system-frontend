import { ChangeEvent, useState } from "react";
import { CouponModel } from "../../../models/Coupon";
import { addCouponApi } from "../../../services/CompanyService";
import "./AddCoupon.css";
import { useForm } from "react-hook-form";
import { Category } from "../../../models/Category";
import { authStore } from "../../../redux/AuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function AddCoupon(): JSX.Element {
    const [selectValue, setSelectValue] = useState<string>(Category.FOOD);
    const { register, handleSubmit } = useForm<CouponModel>();
    const navigate = useNavigate();

    const couponImages = {
        cinema: "https://media.istockphoto.com/id/1494642262/photo/people-in-the-cinema-auditorium-with-empty-white-screen.jpg?s=612x612&w=0&k=20&c=wiVYHafqEAlvufaCpOTZhn9wuklrgKHdDHWqpmMGhjw=",
        food: "https://media.istockphoto.com/id/1155240408/photo/table-filled-with-large-variety-of-food.jpg?s=612x612&w=0&k=20&c=uJEbKmR3wOxwdhQR_36as5WeP6_HDqfU-QmAq63OVEE=",
        fashion: "https://media.istockphoto.com/id/940236760/photo/catwalk-runway-show-event.jpg?s=612x612&w=0&k=20&c=xhluwJbXAmKVwoffVEk8JlfWfsIpTpTNlRtlwXcnV4Y=",
        spa: "https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.jpg?s=612x612&w=0&k=20&c=yrNXIAA1mSSzypzbKMTl4807nRG4S8rs5RsWb-J0M9U=",
        tech: "https://s.wsj.net/public/resources/images/ON-CB801_chip_B620_20170405183838.jpg",
        sport: "https://t4.ftcdn.net/jpg/00/04/43/79/360_F_4437974_DbE4NRiaoRtUeivMyfPoXZFNdCnYmjPq.jpg"
    }
    
    function sendCoupon(newCoupon: CouponModel) {
        switch (newCoupon.category){
            case Category.CINEMA:
                newCoupon.image = couponImages.cinema;
                break;
            case Category.FOOD:
                newCoupon.image = couponImages.food;
                break;
            case Category.FASHION:
                newCoupon.image = couponImages.fashion;
                break;
            case Category.SPA:
                newCoupon.image = couponImages.spa;
                break;
            case Category.TECH:
                newCoupon.image = couponImages.tech;
                break;
            case Category.SPORT:
                newCoupon.image = couponImages.sport;
                break;    
        }
        newCoupon.companyID = authStore.getState().id;
        addCouponApi(newCoupon)
            .then((res) => {
                toast("Coupon added! the status is: " + res.status);
                navigate("/coupons")
            })
            .catch((err) => {
                alert(err.response.data)
                console.log(err);
            });
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectValue(event.target.value);
    }

    return (
        <div className="AddCoupon">
            <form onSubmit={handleSubmit(sendCoupon)}>
                <input
                    type="text"
                    placeholder="title"
                    {...register("title", { required: "title is required" })}
                />
                <br />
                <input
                    type="text"
                    placeholder="description"
                    {...register("description", { required: "description is required" })}
                />
                <br />
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
                </select>
                <br />
                Start date: <input type="date" {...register("startDate")} />
                <br />
                End date: <input type="date" {...register("endDate")} />
                <br />
                <input
                    type="number"
                    placeholder="amount"
                    {...register("amount", { required: "amount is required" })}
                />
                <br />
                <input
                    type="number"
                    placeholder="price"
                    step={"0.01"}
                    {...register("price", { required: "price is required" })}
                />
                <br />
                <button type="submit">Add Coupon</button>
            </form>
        </div>
    );
}
