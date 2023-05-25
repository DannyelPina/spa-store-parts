import { memo, useEffect, useRef } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import useSWR from "swr";

import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFilters } from "../../Hooks/useFilters";
import { API_KEY, ENDPOINT, SWRThirdParams, fetcher } from "../../api";
import { Loading } from "../Loading";

function Competition() {
	const { t } = useTranslation()

	const { handleSetSelectedCompetition} = useFilters();

	const swiperRef = useRef<SwiperRef>(null);

	const requestParam = [ENDPOINT.COMPETITIONS, API_KEY];
	const { data: response, error, isLoading, } = useSWR(requestParam, ([url, apiKey]) => fetcher(url, apiKey), SWRThirdParams);

	useEffect(() => {
		if (response?.data[0]?.id) {
			handleSetSelectedCompetition(response?.data[0]?.id);
		}
	}, [handleSetSelectedCompetition, response]);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <p className="w-full text-center">{t('error')}</p>;
	}

	function changeCompetition(id: string, index: number) {
		handleSetSelectedCompetition(id);
		swiperRef.current?.swiper.slideTo(index);
	}

	return (
		<Swiper
			ref={swiperRef}
			breakpoints={{
				0: {
					slidesPerView: 3,
					spaceBetween: 10,
					centeredSlides: true
				},
				1024: {
					slidesPerView: 8,
					spaceBetween: 10,
					centeredSlides: false
				},
				1366: {
					slidesPerView: 10,
					spaceBetween: 10,
					centeredSlides: false
				},
			}}
			centerInsufficientSlides={true}
			grabCursor={true}
			onSlideChange={(swiper) =>handleSetSelectedCompetition(response?.data[swiper.activeIndex].id)}
			pagination={true}
			modules={[Pagination]}
		>
			{response?.data?.map((item: any, index: number) => (
				<SwiperSlide key={item.id}>
					{({ isActive }) => (
						<div 
							onClick={() => changeCompetition(item.id, index) }
							className={`w-24 h-24 bg-center bg-no-repeat bg-cover cursor-pointer mb-[40px] ${!isActive ? "grayscale" : ""}`}
							style={{backgroundImage: `url(${item.image})`,}}
						></div>
					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export const MemoizedCompetition = memo(Competition);
