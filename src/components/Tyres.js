import axios from 'axios'
import React from 'react'

export class Tyres extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTyre: null,
            tyresList: []
        }
    }

    handleSelectTyre = event => {
        const tyreId = event.target.value;
        console.log(tyreId)
        if (this.state.selectedTyre?.id === tyreId) {
            this.setState({ selectedTyre: null });
        } else {
            axios.get(`https://localhost:5001/items/${tyreId}`)
                .then(response => {
                    this.setState({ selectedTyre: response.data })
                }).catch(error => {
                    console.error("API error", error);
                });
        }
    }

    getTyresList() {
        axios.get('https://localhost:5001/items')
            .then(response => {
                this.setState({ tyresList: response.data })
            })
            .catch(error => {
                console.log("Hiba", error)
            })
    }

    componentDidMount() {
        this.getTyresList();
        // fetch('https://localhost:5001/items') //GetItems
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({tyresList: data})
        //     })
        //     .catch(error => {
        //         console.log("Hiba",error)
        //     })
    }

    render() {
        const { selectedTyre, tyresList } = this.state
        return (
            <div className="container-wrapper">
                <div className="conatiner">
                    <header>
                        <div id="logo"></div>
                        <h3>Tyres store - powered by Topmotive</h3>
                    </header>
                    <main>
                        <section className="tires">
                            <h4 className="tires-title">
                                <span className="tires-icon"></span>
                                Tyres
                            </h4>
                            <div className="table">
                                <div className="row">
                                    <div>Name</div>
                                    <div>Width</div>
                                    <div>Height</div>
                                    <div>Inch</div>
                                    <div>Price</div>
                                    <div>Created Date</div>
                                    <div>&nbsp;</div>
                                </div>
                                {
                                    tyresList.map(tire =>
                                        <div className="row" key={tire.id}>
                                            <div>{tire.name}</div>
                                            <div>{tire.width}</div>
                                            <div>{tire.height}</div>
                                            <div>{tire.inch}</div>
                                            <div>{tire.price}</div>
                                            <div>{tire.createdDate}</div>
                                            <button className="btn arrow" value={tire.id} onClick={this.handleSelectTyre}>Select</button>
                                        </div>)
                                }
                            </div>
                        </section>
                    </main>
                </div>
                { selectedTyre && <section className="tires">
                    <h4 className="tires-title">
                        <span className="tires-icon"></span>
                        Tyres
                    </h4>
                    <div className="table">
                        <div className="row">
                            <div>Name</div>
                            <div>Width</div>
                            <div>Height</div>
                            <div>Inch</div>
                            <div>Price</div>
                            <div>Created Date</div>
                            <div>&nbsp;</div>
                        </div>
                        <div className="row">
                            <div>{selectedTyre.name}</div>
                            <div>{selectedTyre.width}</div>
                            <div>{selectedTyre.height}</div>
                            <div>{selectedTyre.inch}</div>
                            <div>{selectedTyre.price}</div>
                            <div>{selectedTyre.createdDate}</div>
                        </div>
                    </div>
                </section>}
            </div>
        )
    }
}

export default Tyres