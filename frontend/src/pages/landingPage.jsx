import  React, { useContext, useState } from "react"
import {landingPageStyles} from "../assets/dummystyle"
import {ArrowRight, LayoutTemplate, Menu, X} from "lucide-react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { ProfileInfoCard } from "../components/Card"
import Modal from "../components/Modal"
import SignUp from "../components/SignUp"
import Login from "../components/Login"
const LandingPage=()=>{
     const {user}=useContext(UserContext)
     const navigate=useNavigate();
     const [openAuthModal,setOpenAuthModal]=useState(false);
    
    const [mobileMenuOpen,setMobileMenuOpen]=useState(false)
    const [currentPage,setCurrentPage]=useState("login");
    const handleCTA=()=>{
      if(!user){
        setOpenAuthModal(true)
      }
      else{
        navigate("/dashboard")
      }
    }
    return (
        <div className={landingPageStyles.container}>
           <header className={landingPageStyles.header}>
              <div className={landingPageStyles.headerContainer}>
                <div className={landingPageStyles.logoContainer}>
                  <div className={landingPageStyles.logoIcon}>
                    <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                  </div>
                  <span className={landingPageStyles.logoText}>
                    ResumeMaker
                  </span>
                </div>
                <button className={landingPageStyles.mobileMenuButton} 
                onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen?
                <X className={landingPageStyles.mobileMenuIcon} size={24}/> 
                :
                <Menu size={24} className={landingPageStyles.mobileMenuIcon}/>   
                }

                </button>

                <div className="hidden items-center md:flex">
                    {user ?(
                      <ProfileInfoCard/>
                    ):(
                      <button className={landingPageStyles.desktopAuthButton} onClick={()=>setOpenAuthModal(true)}>
                         Get Started
                      </button>
                    )}
                </div>
              </div>

              {mobileMenuOpen && (
                <div className={landingPageStyles.mobileMenu}>
                  <div className={landingPageStyles.mobileMenuContainer}>
                    {user ?(
                      <div className={landingPageStyles.mobileUserInfo}>
                        <div className={landingPageStyles.mobileUserWelcome}>
                          Welcome Back
                        </div>
                        <button className={landingPageStyles.mobileDashboardButton}
                        onClick={()=>{
                          navigate("/dashboard")
                          setMobileMenuOpen(false)
                        }}
                        >
                          Go to Dashboard
                        </button>
                      </div>
                    ):(
                      <button className={landingPageStyles.mobileAuthButton}
                      onClick={()=>{
                        setOpenAuthModal(true)
                        setMobileMenuOpen(false)
                      }}
                      > Get Started</button>
                    )}
                  </div>
                </div>
              )}
           </header>

           <main className={landingPageStyles.main}>
            <section className={landingPageStyles.heroSection}>
              <div className={landingPageStyles.heroGrid}>
                <div className={landingPageStyles.heroLeft}>
                  <div className={landingPageStyles.tagline}>
                    Professional Resume builder
                  </div>
                  <h1 className={landingPageStyles.heading}>
                    <span className={landingPageStyles.headingText}>Design</span>
                    <span className={landingPageStyles.headingGradient}>Resumes</span>
                  </h1>
                  <p className={landingPageStyles.description}>
                  offers ready-to-use templates, guided inputs, and export options to simplify the job application process.
                  </p>

                  <div className={landingPageStyles.ctaButtons}>
                    <button className={landingPageStyles.primaryButton}
                    onClick={handleCTA}
                    >
                    <div className={landingPageStyles.primaryButtonOverlay}></div>
                    <span className={landingPageStyles.primaryButtonContent}>
                      Start Building
                      <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18}/>
                    </span>
                    </button>

                    <button 
                    onClick={handleCTA}
                    className={landingPageStyles.secondaryButton}>
                      View Template
                    </button>
                  </div>
                </div>
                <div className={landingPageStyles.heroIllustration}>
                            <div className={landingPageStyles.heroIllustrationBg}></div>
                            <div className={landingPageStyles.heroIllustrationContainer}>
                                <svg
                                    viewBox="0 0 400 500"
                                    className={landingPageStyles.svgContainer}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Background */}
                                    <defs>
                                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#d946ef" />
                                        </linearGradient>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" />
                                            <stop offset="100%" stopColor="#f8fafc" />
                                        </linearGradient>
                                    </defs>

                                    {/* SVG elements */}
                                    <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                                    <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                                    <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="170" width="260" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="185" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="200" width="240" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="70" y="290" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="310" width="180" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="325" width="150" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="340" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />

                                    {/* Animated elements */}
                                    <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 0,-10; 0,0"
                                            dur="3s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 5,0; 0,0"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            values="0 360 210; 360 360 210; 0 360 210"
                                            dur="4s"
                                            repeatCount="indefinite"
                                        />
                                    </polygon>
                                </svg>
                            </div>
                        </div>
              </div>
            </section>
           </main>

           <footer className={landingPageStyles.footer}>
            <div className={landingPageStyles.footerContainer}>
              <p className={landingPageStyles.footerText}>
                Designed By Mayank dhingra
              </p>
            </div>
           </footer>

           <Modal isOpen={openAuthModal} onClose={()=>{
            setOpenAuthModal(false)
            setCurrentPage("login")
           }} hideHeader>
              <div className="">
                {currentPage === "login" && <Login setCurrentPage={setCurrentPage}/>}
                {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage}/>}
              </div>
           </Modal>
        </div>
    )
}

export default LandingPage