import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import Register from "./Register"
import Login from "./Login"
import InfoTooltip from "./InfoTooltip"
import ProtectedRouteElement from "./ProtectedRoute"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { useEffect, useState } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import React from "react"
import api from "../utils/Api"
import * as auth from "../utils/Auth.js"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    item: {},
  })
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState("")

  const [userData, setUserData] = React.useState(null)
  const [statusInfoTooltip, setStatusInfoTooltip] = React.useState(false)
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData)
          setCards(cards.data.reverse())
        })
        .catch((err) => console.log(err))
  }, [loggedIn])

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handlePlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setInfoTooltipPopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setSelectedCard({
      isOpen: false,
      item: {},
    })
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.isOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id)
    ;(isLiked ? api.deleteLike(card._id) : api.putLike(card._id, true))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        )
        setCards(newCards)
      })
      .catch((err) => console.log(err))
  }

  function handleUser(name, about) {
    setIsLoading(true)
    api
      .editInfo(name, about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAvatar(avatar) {
    setIsLoading(true)
    api
      .userAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handlePlace(name, link) {
    setIsLoading(true)
    api
      .newCard(name, link)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (!res) {
            return
          }
          setEmail(res.email)
          setLoggedIn(true)
          navigate("/")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  function changeLogin(email, password) {
    console.log(email, password)
    auth
      .auth(email, password)
      .then((data) => {
        /* console.log(data)*/
        if (data.token) {
          setUserData(email)
          setLoggedIn(true)
          navigate("/cards", { replace: true })
        }
      })
      .catch((err) => {
        console.log(err)
        setStatusInfoTooltip(false)
        setInfoTooltipPopupOpen(true)
      })
  }

  function changeRegister(email, password) {
    console.log(email, password)
    auth
      .reg(email, password)
      .then(() => {
        navigate("/signin", { replace: true })
        setStatusInfoTooltip(true)
      })
      .catch((err) => {
        console.log(err)
        setStatusInfoTooltip(false)
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true)
      })
  }

  function signOut() {
    localStorage.removeItem("token")
    setUserData("")
    setLoggedIn(false)
    navigate("/signin", { replace: true })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header userData={userData} signOut={signOut} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Navigate to="/cards" replace />
                  ) : (
                    <Navigate to="/signup" replace />
                  )
                }
              />
              <Route
                path="/signup"
                element={<Register changeRegister={changeRegister} />}
              />
              <Route
                path="/signin"
                element={<Login changeLogin={changeLogin} />}
              />
              <Route
                path="/cards"
                element={
                  <ProtectedRouteElement
                    loggedIn={loggedIn}
                    element={Main}
                    onEditProfile={handleProfileClick}
                    onEditAvatar={handleAvatarClick}
                    onAddPlace={handlePlaceClick}
                    onCardClick={setSelectedCard}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                }
              />
              <Route path="#" element={<h2>Not found</h2>} />
            </Routes>
          </main>

          {loggedIn ? <Footer /> : ""}
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            result={statusInfoTooltip}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handlePlace}
            isLoading={isLoading}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            btnText="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
