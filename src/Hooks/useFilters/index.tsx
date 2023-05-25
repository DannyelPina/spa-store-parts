import React, {
    createContext,
    useCallback,
    useContext,
    useState
} from "react";

type FiltersContextProps = {
    selectedCompetition: string;
    selectedEdition: string;
    selectedIndicator: string;
    selectedTeam: string;
    selectedPlayer: string;
    currentPage: number;
    handleSetSelectedCompetition: (value: string) => void;
    handleSetSelectedItem: (value: string, key: ComboboxItemKeyProps) => void;
    handleResetFilters: () => void;
    handleSetCurrentPage: (value: number) => void
}

export type ComboboxItemProps = {
    indicator?: string;
    edition?: string;
    team?: string;
    player?: string;
}

type ComboboxItemKeyProps = "indicator" | "edition" | "team" | "player"

const FiltersContext = createContext({} as FiltersContextProps)

const FiltersProvider: React.FC<any> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompetition, setSelectedCompetition] = useState("");
    const [selectedEdition, setSelectedEdition] = useState("");
    const [selectedIndicator, setSelectedIndicator] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState("");

    const handleResetFilters = useCallback(() => {
        setSelectedEdition("")
        setSelectedPlayer("")
        setSelectedTeam("")
    }, [])
    const handleSetCurrentPage = useCallback((value: number) => setCurrentPage(value), [])
    const handleSetSelectedCompetition = useCallback((value: string) => {
        setCurrentPage(1);
        setSelectedCompetition(value)
    }, [])
    const handleSetSelectedItem = useCallback((value: string, key: ComboboxItemKeyProps) => {

        setCurrentPage(1);
        
        switch (key) {
            case "edition":
                setSelectedEdition(value)
                break;

            case "indicator":
                setSelectedIndicator(value)
                break;

            case "team":
                setSelectedTeam(value)
                break;  
                
            case "player":
                setSelectedPlayer(value)
                break;
        
            default:
                break;
        }
    }, [])

    return(
        <FiltersContext.Provider
            value={{
                selectedCompetition,
                selectedEdition,
                selectedIndicator,
                selectedPlayer,
                selectedTeam,
                handleSetSelectedCompetition,
                handleSetSelectedItem,
                handleResetFilters,
                handleSetCurrentPage,
                currentPage
            }}
        >
            { children }
        </FiltersContext.Provider>
    )
}

const useFilters = () => {
    const filtersContext = useContext(FiltersContext)

    return filtersContext
}

export { useFilters, FiltersProvider };

