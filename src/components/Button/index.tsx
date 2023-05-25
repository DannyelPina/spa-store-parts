import { memo } from "react";
import { useTranslation } from "react-i18next";

type ButtonProps = {
    type?: "link" | "primary";
    withIcon?: boolean;
    label?: string;
    handleClick?: () => void;
}

function Button({type, withIcon, label, handleClick}: ButtonProps) {
	const { t } = useTranslation()

    if(type === "link") {
        return(
            <button type="button" title="Reset filters" onClick={handleClick} className="w-fit flex flex-row justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#D8B97D]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span className="text-[#D8B97D] text-sm font-medium ml-4">{t("resetFilters")}</span>
            </button>
        )
    }

    return(
        <button type="button" title={label} onClick={handleClick} className="bg-[#D8B97D] h-10 flex items-center justify-center relative w-full">
            {withIcon && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white absolute left-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            )}
                
            <span className="text-white text-base font-bold uppercase ml-4">{t(label!)}</span>
        </button>
    )
}

export const MemoizedButton = memo(Button)