import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../models/Coupon";
import { getCompanyCouponsApi } from "../../../services/CompanyService";
import { CouponCard } from "../../CommonArea/Cards/CouponCard/CouponCard";
import "./CompanyCouponsList.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Category } from "../../../models/Category";

export function CompanyCouponsList(): JSX.Element {

    const navigate = useNavigate();
    
    function goToAddCoupon(){
        navigate("/add_coupon");
    }

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [selectValue, setSelectValue] = useState<Category | "all">("all");
    const [maxPrice, setMaxPrice] = useState<number | "">("");


    useEffect(() =>{
        getCompanyCouponsApi()
        .then((res) => {
            setCoupons(res)
        })
        .catch((e) => {
            console.log(e)
        })
    }, [])

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.target.value as Category | "all";
        setSelectValue(value);     
    }

    function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setMaxPrice(value === "" ? "" : parseFloat(value)); // Convert to number or reset to empty
    }

    const filteredCoupons = coupons.filter((coupon) => {
        const matchesCategory = selectValue === "all" || coupon.category === selectValue;
        const matchesMaxPrice = maxPrice === "" || coupon.price <= maxPrice;
        return matchesCategory && matchesMaxPrice;
    });

    return (
        <div className="CompanyCouponsList">
            <button onClick={goToAddCoupon}>Add Coupon</button><br/>

            <select id=""value={selectValue} onChange={(event) => handleSelectChange(event)}>
                    <option value="all">All Categories</option>
                    {Object.values(Category).map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select> <br />

            <label htmlFor="maxPriceInput">Max Price: </label>
            <input
                id="maxPriceInput"
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="Enter max price"
            />
            <br />

			<div className="container">
                {filteredCoupons.length > 0 ? (
                    filteredCoupons.map((coupon) => (
                        <div key={coupon.id} className="coupon-item">
                            <CouponCard coupon={coupon} showDeleteButton={true} showUpdateButton={true} setCoupons={setCoupons} />
                        </div>
                    ))
                ) : (                    
                    <span>No coupons available</span>
                )}
                </div>

        </div>
    );
}
