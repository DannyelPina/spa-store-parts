import { useTranslation } from "react-i18next";
import loader from "../../assets/img/loader.gif";
type LoadingProps = {
	width?: number;
	height?: number;
	isText?: boolean;
};

export function Loading({ width, height, isText }: LoadingProps) {
	const { t } = useTranslation()

	if (isText) {
		return <option>{t('loadingData')}</option>;
	}

	return (
		<div className="flex justify-center items-center">
			<img
				src={loader}
				alt="loading"
				width={width || 45}
				height={height || 45}
			/>
		</div>
	);
}
