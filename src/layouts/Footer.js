import "../assets/css/footer.css"
import Instagram from "../assets/images/Instagram Circle.png"
import Internet from "../assets/images/Internet.png"
import Email from "../assets/images/Email.png"

const Footer = () => {
    return(
        <>
        <footer className="section bg-footer mt-3">
        <div className="container">
            <div className="row px-3">
                <div className="col-lg-3">
                    <div className="">
                        <h5 className="footer-heading  text-white">YeloSpace Logo</h5>
                        <div className="footer-link mt-4">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        </div>  
                        {/* <ul className="list-unstyled footer-link mt-4">
                            <li><a href="">Pages</a></li>
                            <li><a href="">Our Team</a></li>
                            <li><a href="">Feuchers</a></li>
                            <li><a href="">Pricing</a></li>
                        </ul> */}
                    </div>
                </div>

                <div className="col-lg-3">
                    <div className="">
                        <h5 className="footer-heading  text-white">Address</h5>
                        <div className="footer-link mt-4">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        </div> 
                    </div>
                </div>

                <div className="col-lg-2">
                    <div className="">
                        <h5 className="footer-heading  text-white">Company</h5>
                        <ul className="list-unstyled footer-link mt-3">
                            <li><a href="">About Us </a></li>
                            <li><a href="">Community Board</a></li>
                            <li><a href="">Be our partner</a></li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="">
                        <h5 className="footer-heading  text-white">Connect With Us</h5>
                        <div className="mt-3 footer-link">
                                <div className="d-flex"><a href="#"><img src={Email} height={30} />yelospacework@gmail.com</a></div>
                                <div className="d-flex"><a href="#"><img src={Instagram}  height={30} />@yelospacework</a></div>
                                <div className="d-flex"><a href="#"><img src={Internet}  height={30}  />www.yelospace.com</a></div>
                        </div>
                    </div>
                </div>

            </div>
            <hr style={{"height":"1px","color":"white","background-color":"white",opacity:"1"}} />
            <div className="text-start mt-5">
            <p className="footer-alt mb-0 f-14">© 2023 Design Theme, All Rights Reserved</p>
        </div>  
        </div>

       
    </footer>
        </>
    )
}
export default Footer;