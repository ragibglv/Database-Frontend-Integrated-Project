import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/TournamentDetails.css';

export default function TournamentDetails() {
    const { id } = useParams();
    const [tournamentDetails, setTournamentDetails] = useState([]);
    const [round_of_16, setRound_of_16] = useState([]);
    const [quarter_final, setQuarter_final] = useState([]);
    const [semi_final, setSemi_final] = useState([]);
    const [final, setFinal] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/tournaments/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTournamentDetails(data);

                setRound_of_16(data.filter((tournament) => { return tournament.stage_name === "round of 16" }));
                setQuarter_final(data.filter((tournament) => { return tournament.stage_name === "quarter-finals" ||
                    tournament.stage_name === "quarter-final" }));
                setFinal(data.filter((tournament) => { return tournament.stage_name === "final" }));
                setSemi_final(data.filter((tournament) => { return tournament.stage_name === "semi-finals" ||
                    tournament.stage_name === "semi-final"}));

                reorderMatches(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    function reorderMatches(data) {
        const round_of_16 = data.filter((tournament) => {
            return tournament.stage_name === "round of 16"
        });
        const quarter_final = data.filter((tournament) => {
            return tournament.stage_name === "quarter-finals" ||
                tournament.stage_name === "quarter-final"
        });
        const semi_final = data.filter((tournament) => {
            return tournament.stage_name === "semi-finals" ||
                tournament.stage_name === "semi-final"
        });

        // reorder quarter_final according to the semi_final
        for(let i = 0; i < 2; i++) {
            const team1 = semi_final[i].team1;
            const team2 = semi_final[i].team2;

            let k = i * 2;
            for(let j = 0; j < 4; j++) {
                if(quarter_final[j].team1 === team1 || quarter_final[j].team2 === team1
                    || quarter_final[j].team1 === team2 || quarter_final[j].team2 === team2) {
                    let match = quarter_final[k];
                    quarter_final[k] = quarter_final[j];
                    quarter_final[j] = match;
                    k += 1;
                    if (k === 2) {
                        break;
                    }
                }
            }
        }
        setQuarter_final(quarter_final);
        if (data.length !== 16) {
            return;
        }

        // reorder round_of_16 according to the quarter_final
        for (let i = 0; i < 4; i++) {
            const team1 = quarter_final[i].team1;
            const team2 = quarter_final[i].team2;

            let k = i * 2;
            for (let j = 0; j < 8; j++) {
                if (round_of_16[j].team1 === team1 || round_of_16[j].team2 === team1
                    || round_of_16[j].team1 === team2 || round_of_16[j].team2 === team2) {
                    console.log(team1, team2)
                    console.log(round_of_16[j]);

                    let match = round_of_16[k];
                    round_of_16[k] = round_of_16[j];
                    round_of_16[j] = match;
                    k += 1;
                    if (k === 4) {
                        break;
                    }
                }
            }
        }
        setRound_of_16(round_of_16);
    }

    function matchComponent(match) {
        return (
            (match.winner) ?
                (
                    <p><span className="winner">{match.team1} {match.home_team_score}</span> - {match.away_team_score} {match.team2}</p>
                ) :
                (
                    <p>{match.team1} {match.home_team_score} - <span className="winner"> {match.away_team_score} {match.team2}</span></p>
                )
        )
    }

    return (
        (tournamentDetails.length === 16) ? (
                <div>
                    <div className="wrapper">
                        <div className="item">
                            <div className="item-parent">
                                {matchComponent(final[0])}
                            </div>
                            <div className="item-childrens">
                                <div className="item-child">
                                    <div className="item">
                                        <div className="item-parent">
                                            {matchComponent(semi_final[0])}
                                        </div>
                                        <div className="item-childrens">
                                            <div className="item-child">
                                                <div className="item">
                                                    <div className="item-parent">
                                                        {matchComponent(quarter_final[0])}
                                                    </div>
                                                    <div className="item-childrens">
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[0])}
                                                        </div>
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[1])}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-child">
                                                <div className="item">
                                                    <div className="item-parent">
                                                        {matchComponent(quarter_final[1])}
                                                    </div>
                                                    <div className="item-childrens">
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[2])}
                                                        </div>
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[3])}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-child">
                                    <div className="item">
                                        <div className="item-parent">
                                            {matchComponent(semi_final[1])}
                                        </div>
                                        <div className="item-childrens">
                                            <div className="item-child">
                                                <div className="item">
                                                    <div className="item-parent">
                                                        {matchComponent(quarter_final[2])}
                                                    </div>
                                                    <div className="item-childrens">
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[4])}
                                                        </div>
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[5])}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-child">
                                                <div className="item">
                                                    <div className="item-parent">
                                                        {matchComponent(quarter_final[3])}
                                                    </div>
                                                    <div className="item-childrens">
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[6])}
                                                        </div>
                                                        <div className="item-child">
                                                            {matchComponent(round_of_16[7])}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
            (
                (tournamentDetails.length === 8) ? (
                        <div className="wrapper">
                            <div className="item">
                                <div className="item">
                                    <div className="item-parent">
                                        {matchComponent(final[0])}
                                    </div>
                                    <div className="item-childrens">
                                        <div className="item-child">
                                            <div className="item">
                                                <div className="item-parent">
                                                    {matchComponent(semi_final[0])}
                                                </div>
                                                <div className="item-childrens">
                                                    <div className="item-child">
                                                        {matchComponent(quarter_final[0])}
                                                    </div>
                                                    <div className="item-child">
                                                        {matchComponent(quarter_final[1])}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-child">
                                            <div className="item">
                                                <div className="item-parent">
                                                    {matchComponent(semi_final[1])}
                                                </div>
                                                <div className="item-childrens">
                                                    <div className="item-child">
                                                        {matchComponent(quarter_final[2])}
                                                    </div>
                                                    <div className="item-child">
                                                        {matchComponent(quarter_final[3])}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <div>Loading...</div>
                    )
            )
    );
}