import { useTranslation } from "react-i18next";
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
				src={process.env.REACT_APP_LOADER}
				alt="loading"
				width={width || 45}
				height={height || 45}
			/>
		</div>
	);
}
