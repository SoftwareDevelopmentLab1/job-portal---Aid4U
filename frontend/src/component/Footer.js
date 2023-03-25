import React from "react";

const Footer = () => {
    return(
        <footer style={{position: "absolute", bottom: 0, width: "100%", height: "200px", backgroundColor: "#333", color: "#fff"}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; Aid4U 2023. All rights reserved.</p>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>123 Main St, City, State 12345</p>
                        <p>Email: info@aid4u.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer