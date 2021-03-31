import axios from 'axios'
import React from 'react'

export class Tyres extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTyre: null,
            tyresList: [],
            formIsVisible: false,
            id: null,
            name: "",
            wifth: 100,
            height: 10,
            inch: 10,
            price: 1
        }
    }

    handleShowCreateForm = () => {
        const { formIsVisible } = this.state;
        this.setState({ formIsVisible: !formIsVisible });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const { id, name, width, height, inch, price } = this.state;
        const tyre = {
            name: name,
            width: parseInt(width),
            height: parseInt(height),
            inch: parseInt(inch),
            price: parseInt(price)
        };

        console.debug(id);
        if (id) {
            axios.put(`https://localhost:5001/items/${id}`, tyre)
                .then(response => {
                    console.debug(response.data);
                    this.getTyresList();
                }).catch(error => {
                    console.error('API error while updateing.', error);
                })
        } else {
            axios.post('', tyre)
                .then(response => {
                    console.debug(response.data);
                    this.getTyresList();
                })
                .catch(error => {
                    console.error("API error while creating tyre.", error);
                });
        }

    }

    handleSelectTyre = event => {
        const tyreId = event.target.value;
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

    handleEditTyre = event => {
        const { tyresList, formIsVisible } = this.state;
        const tyreId = event.target.value;
        const selectedTyre = tyresList.find(tyre => tyre.id === tyreId)

        this.setState({
            formIsVisible: true,
            id: tyreId,
            name: selectedTyre.name,
            width: selectedTyre.width,
            height: selectedTyre.height,
            inch: selectedTyre.inch,
            price: selectedTyre.price,
        })
    }

    handleDeleteTyre = event => {
        const tyreId = event.target.value;
        axios.delete(`https://localhost:5001/items/${tyreId}`)
            .then(response => {
                console.debug(response.data);
                this.getTyresList();
            }).catch(error => {
                console.error("API error", error);
            });
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
        const { selectedTyre, tyresList, formIsVisible, name, width, height, inch, price } = this.state
        return (
            <div className="container-wrapper">
                <div className="conatiner">
                    <header>
                        <div id="logo"></div>
                        <h3>Tyres store - powered by Topmotive</h3>
                    </header>
                    <main>
                        <section>
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
                                            <button className="btn arrow" value={tire.id} onClick={this.handleEditTyre}>Edit</button>
                                            <button className="btn arrow" value={tire.id} onClick={this.handleDeleteTyre}>Delete</button>
                                        </div>)
                                }
                                <button className="btn arrow" onClick={this.handleShowCreateForm}>Create</button>
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
                {formIsVisible && <section className="tires">
                    <form onSubmit={this.handleSubmit} action="none">
                        <label>Tyre name:
                            <input type="text" name="name" value={name} onChange={this.handleChange} />
                        </label>
                        <label>Tyre width:
                            <input type="number" name="width" value={width} min="100" max="400" onChange={this.handleChange} />
                        </label>
                        <label>Tyre height:
                            <input type="number" name="height" value={height} min="10" max="100" onChange={this.handleChange} />
                        </label>
                        <label>Tyre inch:
                            <input type="number" name="inch" value={inch} min="10" max="100" onChange={this.handleChange} />
                        </label>
                        <label>Tyre price:
                            <input type="number" name="price" value={price} min="1" max="1000" onChange={this.handleChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </section>}
            </div>
        )
    }
}

export default Tyres