import "./css/coreval.css";
import { useEffect, useState } from "react";

function CoreValue(){
    const [kapwa, setKapwa] = useState("Loading...");
    const [kalinangan, setKalinangan] = useState("Loading...");
    const [kaginhawaan, setKaginhawaan] = useState("Loading...");
    const [mission, setMission] = useState("Loading...");
    const [vision, setVision] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
        .then((res) => {
            if (!res.ok) throw new Error("Network error");
            return res.json();
        })
        .then((data) => {
            setKapwa(data.core_kapwa || "No data.");
            setKalinangan(data.core_kalinangan || "No data.");
            setKaginhawaan(data.core_kaginhawaan || "No data.");
            setMission(data.mission || "No data.");
            setVision(data.vision || "No data.");
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            setKapwa("Failed to load.");
            setKalinangan("Failed to load.");
            setKaginhawaan("Failed to load.");
            setMission("Failed to load.");
            setVision("Failed to load.");
        });
    }, []);

    return(
        <div className="coreval-sec">
            <div className="coreval-sec-content">
                <h1 className="coreval-header">Core Values</h1>
                    <div className="coreval-bg">
                        <img src="./src/assets/aboutpage/coreval-cow-bg.png" alt="Blogs Background" />
                        <div className="coreval-content-1">
                            <div className="coreval-container-1">
                                <h1 className="coreval-container-1-header">Kapwa</h1>  
                                <p className="coreval-container-1-description"
                                dangerouslySetInnerHTML={{
                                    __html: kapwa.replace(/\n/g, "<br />"),
                                  }}
                                >
                                {/* Pagpapalaganap ng pagkakapantay-pantay at tunay na koneksyon sa pamamagitan ng pakikiisa sa mga tao.<br/><br/>
                                Isinasabuhay ito ng TK sa pamamagitan ng pagtutulungan at bayanihan sa mga komunidad, lalo na sa pagbibigay suporta sa mga nangangailangan. Pinapahalagahan nila ang pakikinig at pag-intindi sa iba't ibang perspektibo upang mapalakas ang pagkakaisa. */}
                                </p>
                            </div>
                        </div>
                        <div className="coreval-content-2">
                            <div className="coreval-container-2">
                                <h1 className="coreval-container-2-header">Kalinangan</h1>  
                                <p className="coreval-container-2-description"
                                dangerouslySetInnerHTML={{
                                    __html: kalinangan.replace(/\n/g, "<br />"),
                                  }}
                                >
                                {/* Pagyakap sa maingat na proseso ng pag-unawa at pagmumuni-muni.<br/><br/>
                                Bilang organisasyon, binibigyang-halaga ng TK ang patuloy na pag-aaral ng sarili at lipunan mula sa sariling karanasan at sa mga kasamang komunidad. Ginagamit ang mga natutunan upang mas mapabuti ang mga programa at adbokasiya. */}
                                </p>
                            </div>
                        </div>
                        <div className="coreval-content-3">
                            <div className="coreval-container-3">
                                <h1 className="coreval-container-3-header">Kaginhawaan</h1>  
                                <p className="coreval-container-3-description"
                                dangerouslySetInnerHTML={{
                                    __html: kaginhawaan.replace(/\n/g, "<br />"),
                                  }}
                                >
                                {/* Pagsusumikap na makamit ang pag-unlad at kagalingang panlahat.<br/><br/>
                                Tinitiyak ng TK na ang kanilang mga gawain ay may positibong epekto sa komunidad, mula sa maliit na tulong hanggang sa paglikha ng mga programang tumutugon sa pangmatagalang pangangailangan. Layunin na makapagbigay ng konkretong pagbabago na nakakapagpagaan ng buhay ng mga tao. */}
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="mission-vision-sec">
                <div className="mission-sec-content">
                    <h1 className="mission-header">Mission</h1>
                    <p className="mission-description"
                    dangerouslySetInnerHTML={{
                        __html: mission.replace(/\n/g, "<br />"),
                      }}
                    >
                        {/* Layunin ng Tara Kabataan ang pagpapatibay ng lakas at tinig ng mga kabataan, sa loob at labas ng paaralan, upang makilala nila ang kanilang sarili at ang kanilang taglay na kakayahan at talento na siyang magsisilbing instrumento upang makatulong sa kanilang sarili, kapwa, komunidad, at bayan. */}
                    </p>
                </div>
                <div className="vision-sec-content">
                    <h1 className="vision-header">Vision</h1>
                    <p className="vision-description"
                    dangerouslySetInnerHTML={{
                        __html: vision.replace(/\n/g, "<br />"),
                      }}
                    >
                        {/* Pangarap ng Tara Kabataan ang pagkakaroon ng isang lungsod at bayan na makakabataan kung saan sa malayang paglinang ng sarili at ng kapwa, abot-kamay ang kaginhawaan para sa lahat. */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CoreValue;