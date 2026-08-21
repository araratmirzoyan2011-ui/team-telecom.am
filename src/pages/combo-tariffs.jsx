import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js";
import { Link, useNavigate } from 'react-router-dom';
import { Select } from '../Components/m3.jsx';
import Pl from '../Components/mobinp.jsx';
import { useState, useEffect } from 'react';

// ----- Small inline icons (no external deps) -----
function InclusionIcon({ type }) {
    const common = "w-5 h-5 text-blue-900 shrink-0";
    switch (type) {
        case "minutes":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M9 18h6" />
                    <path d="M12 6l4 4-4 4" />
                </svg>
            );
        case "call":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <circle cx="12" cy="18" r="0.8" fill="currentColor" stroke="none" />
                </svg>
            );
        case "sms":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1.2 4A8 8 0 0 1 21 12Z" />
                </svg>
            );
        case "internet":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="12" rx="1" />
                    <path d="M8 20h8" />
                    <path d="M12 16v4" />
                </svg>
            );
        case "wifi":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 8.5a16 16 0 0 1 20 0" />
                    <path d="M5.5 12a11 11 0 0 1 13 0" />
                    <path d="M9 15.5a6 6 0 0 1 6 0" />
                    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
                </svg>
            );
        case "teamTV":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="6" width="16" height="11" rx="1.5" />
                    <path d="M9 20h6" />
                    <path d="M8 10.5h4" />
                </svg>
            );
        case "teamBonus":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <ellipse cx="12" cy="13" rx="8" ry="6" />
                    <path d="M18 12h2v3h-2" />
                    <circle cx="9" cy="12" r="0.8" fill="currentColor" stroke="none" />
                    <path d="M9 19v1" />
                    <path d="M15 19v1" />
                </svg>
            );
        case "roaming":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 13l18-7-7 18-2-8-8-3z" />
                </svg>
            );
        case "beFreeTerms":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h13l3 4-3 4H4z" />
                    <path d="M4 12h13l3 4-3 4H4z" />
                </svg>
            );
        default:
            return (
                <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                    Be
                </div>
            );
    }
}

// ----- Accordion: groups on the left, expandable into sub-packages -----
function comboAccordion({ groups, openGroupId, selectedId, onToggleGroup, onSelectPackage }) {
    return (
        <div className="w-full max-w-[300px] rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0">
            <div className="bg-neutral-100 px-4 py-3 font-bold text-gray-900">
                Choose your package
            </div>

            {groups.map((group, index) => {
                const isMulti = group.packages.length > 1;
                const isSelectedGroup = group.packages.some((p) => p.id === selectedId);
                const isOpen = openGroupId === group.id;

                return (
                    <div key={group.id} className={index !== 0 ? "border-t border-gray-200" : ""}>
                        <button
                            type="button"
                            onClick={() => onToggleGroup(group)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold transition-colors ${
                                isSelectedGroup ? "bg-teal-400 text-white" : "text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                            <span>{group.listTitle}</span>
                            {isMulti && (
                                <span className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                                    ▾
                                </span>
                            )}
                            {!isMulti && <span>▾</span>}
                        </button>

                        {isMulti && isOpen && (
                            <div>
                                {group.packages.map((pkg) => {
                                    const isActivePkg = pkg.id === selectedId;
                                    return (
                                        <button
                                            key={pkg.id}
                                            type="button"
                                            onClick={() => onSelectPackage(pkg.id)}
                                            className={`w-full text-left px-6 py-2.5 text-sm transition-colors ${
                                                isActivePkg
                                                    ? "bg-teal-400 text-white font-semibold"
                                                    : "text-blue-900 hover:bg-gray-50"
                                            }`}
                                        >
                                            {pkg.subLabel}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function comboDetails({ pkg, onJoin }) {
    return (
        <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold text-gray-900">{pkg.heading}</h1>

            {pkg.description && (
                <p className="mt-2 text-gray-500">{pkg.description}</p>
            )}
            {pkg.feeAmount && (
                <p className="mt-1 text-gray-500">
                    {pkg.feePrefix} <span className="font-semibold text-gray-700">{pkg.feeAmount}</span> {pkg.feeSuffix}
                </p>
            )}
            {pkg.discount && (
                <p className="mt-1 text-xs text-gray-400 max-w-lg">{pkg.discount}</p>
            )}

            <h2 className="mt-8 text-xl font-bold text-gray-900">Mobile inclusions</h2>
            <div className="mt-3 divide-y divide-gray-100">
                {(pkg.mobileInclusions || []).map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 gap-4">
                        <div className="flex items-center gap-3 text-gray-500">
                            <InclusionIcon type={item.icon} />
                            <span>{item.text}</span>
                        </div>
                        {item.value && (
                            <div className="text-gray-900 font-bold whitespace-nowrap">
                                {item.value}{" "}
                                {item.unit && <span className="text-sm font-normal text-gray-500">{item.unit}</span>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h2 className="mt-8 text-xl font-bold text-gray-900">Fixed inclusions</h2>
            <div className="mt-3 divide-y divide-gray-100 border-b border-gray-100 pb-4">
                {(pkg.fixedInclusions || []).map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 gap-4">
                        <div className="flex items-center gap-3 text-gray-500">
                            <InclusionIcon type={item.icon} />
                            <span>{item.text}</span>
                        </div>
                        {item.value && (
                            <div className="text-gray-900 font-bold whitespace-nowrap">
                                {item.value}{" "}
                                {item.unit && <span className="text-sm font-normal text-gray-500">{item.unit}</span>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onJoin}
                className="mt-8 w-full max-w-xs bg-red-400 hover:bg-red-500 text-white font-bold py-3 rounded-full transition-colors"
            >
                Join
            </button>
        </div>
    );
}

function Combo() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Prepaid");
    const [openGroupId, setOpenGroupId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const [comboGroups, setComboGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ----- Fetch packages from Firestore and rebuild the groups structure -----
    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            setError(null);
            try {
                const snapshot = await getDocs(collection(db, "comboPackages"));

                // Grouping map: groupId -> { id, listTitle, packages: [] }
                const groupsMap = new Map();

                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    const { groupId, groupTitle, ...pkgFields } = data;

                    if (!groupsMap.has(groupId)) {
                        groupsMap.set(groupId, {
                            id: groupId,
                            listTitle: groupTitle,
                            packages: [],
                        });
                    }

                    groupsMap.get(groupId).packages.push({
                        ...pkgFields,
                        docId: docSnap.id, // Firestore-ի document ID-ն էլ պահում ենք, եթե պետք գա
                    });
                });

                const groupsArray = Array.from(groupsMap.values());
                setComboGroups(groupsArray);

                // Default ընտրված package՝ առաջին խմբի առաջին package-ը
                if (groupsArray.length > 0 && groupsArray[0].packages.length > 0) {
                    setSelectedId(groupsArray[0].packages[0].id);
                }
            } catch (err) {
                console.error("Combo packages fetch error:", err);
                setError("Չհաջողվեց բեռնել փաթեթները");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const allPackages = comboGroups.flatMap((g) => g.packages);
    const selectedPackage = allPackages.find((p) => p.id === selectedId) || allPackages[0];

    const handleToggleGroup = (group) => {
        if (group.packages.length === 1) {
            // Single-package group: header click selects it directly, no expand needed.
            setSelectedId(group.packages[0].id);
        } else {
            setOpenGroupId((prev) => (prev === group.id ? null : group.id));
        }
    };

    const handleSelectPackage = (pkgId) => {
        setSelectedId(pkgId);
    };

    const handleJoin = () => {
        // TODO: hook this up to Firestore / navigation as needed
        console.log("Join clicked for", selectedPackage?.id);
    };

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/17488638560003.png")}

            <div className="mt-[-50px] h-[120px] bg-neutral-100 flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%]">
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/1651070448779/45x45.png" text="Mobile" onClickHandler={() => navigate('/Mobile')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Internet and TV - COSMO" onClickHandler={() => navigate('/Internet-and-Tv')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Internet and TV - COMBO" onClickHandler={() => navigate('/forSmartphones')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Home phone" onClickHandler={() => navigate('/home-phone')} />
            </div>

            <div className="w-4/5 ml-[10%] mt-10 mb-16 flex gap-10 items-start max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] max-[700px]:flex-col">
                {loading && (
                    <p className="text-gray-500">Բեռնվում է...</p>
                )}

                {!loading && error && (
                    <p className="text-red-500">{error}</p>
                )}

                {!loading && !error && selectedPackage && (
                    <>
                        {comboAccordion({
                            groups: comboGroups,
                            openGroupId,
                            selectedId,
                            onToggleGroup: handleToggleGroup,
                            onSelectPackage: handleSelectPackage,
                        })}
                        {comboDetails({ pkg: selectedPackage, onJoin: handleJoin })}
                    </>
                )}
            </div>

            <Footer />
        </>
    )
}
export default Combo