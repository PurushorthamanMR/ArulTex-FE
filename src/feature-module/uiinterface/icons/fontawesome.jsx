/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAddressCard,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faAmbulance,
  faAmericanSignLanguageInterpreting,
  faAnchor,
  faAngleDoubleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faApple,
  faArchive,
  faChartArea,
  faArrowCircleDown,
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowsAlt,
  faAssistiveListeningSystems,
  faAsterisk,
  faAt,
  faAudioDescription,
  faBackward,
  faBalanceScale,
  faBan,
  faBarcode,
  faBars,
  faBath,
  faBatteryEmpty,
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryThreeQuarters,
  faBed,
  faBeer,
  faBell,
  faBellSlash,
  faBicycle,
  faBinoculars,
  faBirthdayCake,
  faBlind,
  faBold,
  faBolt,
  faBomb,
  faBook,
  faBookmark,
  faBraille,
  faBriefcase,
  faBug,
  faBuilding,
  faBullhorn,
  faBullseye,
  faBus,
  faCalculator,
  faCalendar,
  faCamera,
  faCameraRetro,
  faCar,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCartArrowDown,
  faCartPlus,
  faCertificate,
  faCheck,
  faCheckCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChild,
  faCircle,
  faClipboard,
  faClone,
  faCloud,
  faCode,
  faCoffee,
  faCog,
  faCogs,
  faColumns,
  faComment,
  faCompress,
  faCopyright,
  faCreditCard,
  faDesktop,
  faEdit,
  faEject,
  faEllipsisH,
  faEllipsisV,
  faEnvelope,
  faEnvelopeOpen,
  faEnvelopeSquare,
  faEraser,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faExpand,
  faEye,
  faEyeSlash,
  faFastBackward,
  faFastForward,
  faFax,
  faFemale,
  faFighterJet,
  faFile,
  faFire,
  faFireExtinguisher,
  faFlag,
  faFlagCheckered,
  faRoad,
  faRocket,
  faSave,
  faSearch,
  faSearchMinus,
  faSearchPlus,
  faServer,
  faShare,
  faShareAlt,
  faShareAltSquare,
  faShareSquare,
  faShip,
  faShoppingBag,
  faShoppingBasket,
  faShoppingCart,
  faShower,
  faSignLanguage,
  faSignal,
  faSitemap,
  faSort,
  faSortDown,
  faSquare,
  faStar,
  faStarHalf,
  faStepBackward,
  faStepForward,
  faStethoscope,
  faStickyNote,
  faStop,
  faStopCircle,
  faStreetView,
  faSubscript,
  faSuitcase,
  faSuperscript,
  faTable,
  faTag,
  faTags,
  faTasks,
  faTaxi,
  faTerminal,
  faTextHeight,
  faTextWidth,
  faTh,
  faThLarge,
  faThList,
  faThermometer,
  faThermometerEmpty,
  faThermometerFull,
  faThermometerHalf,
  faThermometerQuarter,
  faThermometerThreeQuarters,
  faThumbsDown,
  faThumbsUp,
  faTimes,
  faTimesCircle,
  faTint,
  faToggleOff,
  faToggleOn,
  faTrademark,
  faTrain,
  faTransgender,
  faTransgenderAlt,
  faTrash,
  faTree,
  faTrophy,
  faTty,
  faTv,
  faUmbrella,
  faUnderline,
  faUndo,
  faUniversalAccess,
  faUniversity,
  faUnlink,
  faUnlock,
  faUnlockAlt,
  faUpload,
  faUserCircle,
  faUserMd,
  faUserPlus,
  faUserSecret,
  faUserTimes,
  faUsers,
  faVenus,
  faVenusDouble,
  faVenusMars,
  faVolumeDown,
  faVolumeOff,
  faVolumeUp,
  faWheelchair,
  faWifi,
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

const FontawesomeIcons = () => {
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper cardhead">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Fontawesome Icon</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Fontawesome</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            {/* Chart */}
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Fontawesome Icon</div>
                </div>
                <div className="card-body">
                  <div className="icons-items">
                    <ul className="icons-list">
                      <li>
                        <FontAwesomeIcon
                          icon={faAddressBook}
                          data-bs-toggle="tooltip"
                          title="fa fa-address-book"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAddressCard}
                          data-bs-toggle="tooltip"
                          title="fa fa-address-card"
                        />
                      </li>

                      <li>
                        <FontAwesomeIcon
                          icon={faAlignCenter}
                          data-bs-toggle="tooltip"
                          title="fa fa-align-center"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAlignJustify}
                          data-bs-toggle="tooltip"
                          title="fa fa-align-justify"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAlignLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-align-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAlignRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-align-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAmbulance}
                          data-bs-toggle="tooltip"
                          title="fa fa-ambulance"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAmericanSignLanguageInterpreting}
                          data-bs-toggle="tooltip"
                          title="fa fa-american-sign-language-interpreting"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAnchor}
                          data-bs-toggle="tooltip"
                          title="fa fa-anchor"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleDoubleDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-double-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleDoubleLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-double-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleDoubleRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-double-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleDoubleUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-double-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAngleUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-angle-up"
                        />
                      </li>
                      {/* <li>
                          <FontAwesomeIcon icon={faApple} data-bs-toggle="tooltip" title="fab fa-apple" />
                        </li> */}
                      <li>
                        <FontAwesomeIcon
                          icon={faArchive}
                          data-bs-toggle="tooltip"
                          title="fa fa-archive"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChartArea}
                          data-bs-toggle="tooltip"
                          title="fas fa-chart-area"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowCircleDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-circle-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowCircleLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-circle-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowCircleRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-circle-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowCircleUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-circle-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrow-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faArrowsAlt}
                          data-bs-toggle="tooltip"
                          title="fa fa-arrows-alt"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAssistiveListeningSystems}
                          data-bs-toggle="tooltip"
                          title="fa fa-assistive-listening-systems"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAsterisk}
                          data-bs-toggle="tooltip"
                          title="fa fa-asterisk"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAt}
                          data-bs-toggle="tooltip"
                          title="fa fa-at"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faAudioDescription}
                          data-bs-toggle="tooltip"
                          title="fa fa-audio-description"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBackward}
                          data-bs-toggle="tooltip"
                          title="fa fa-backward"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBalanceScale}
                          data-bs-toggle="tooltip"
                          title="fa fa-balance-scale"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBan}
                          data-bs-toggle="tooltip"
                          title="fa fa-ban"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBarcode}
                          data-bs-toggle="tooltip"
                          title="fa fa-barcode"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBars}
                          data-bs-toggle="tooltip"
                          title="fa fa-bars"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBath}
                          data-bs-toggle="tooltip"
                          title="fa fa-bath"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBatteryEmpty}
                          data-bs-toggle="tooltip"
                          title="fa fa-battery-empty"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBatteryFull}
                          data-bs-toggle="tooltip"
                          title="fa fa-battery-full"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBatteryHalf}
                          data-bs-toggle="tooltip"
                          title="fa fa-battery-half"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBatteryQuarter}
                          data-bs-toggle="tooltip"
                          title="fa fa-battery-quarter"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBatteryThreeQuarters}
                          data-bs-toggle="tooltip"
                          title="fa fa-battery-three-quarters"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBed}
                          data-bs-toggle="tooltip"
                          title="fa fa-bed"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBeer}
                          data-bs-toggle="tooltip"
                          title="fa fa-beer"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBell}
                          data-bs-toggle="tooltip"
                          title="fa fa-bell"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBellSlash}
                          data-bs-toggle="tooltip"
                          title="fa fa-bell-slash"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBicycle}
                          data-bs-toggle="tooltip"
                          title="fa fa-bicycle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBinoculars}
                          data-bs-toggle="tooltip"
                          title="fa fa-binoculars"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBirthdayCake}
                          data-bs-toggle="tooltip"
                          title="fa fa-birthday-cake"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBlind}
                          data-bs-toggle="tooltip"
                          title="fa fa-blind"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBold}
                          data-bs-toggle="tooltip"
                          title="fa fa-bold"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBolt}
                          data-bs-toggle="tooltip"
                          title="fa fa-bolt"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBomb}
                          data-bs-toggle="tooltip"
                          title="fa fa-bomb"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBook}
                          data-bs-toggle="tooltip"
                          title="fa fa-book"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBookmark}
                          data-bs-toggle="tooltip"
                          title="fa fa-bookmark"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBraille}
                          data-bs-toggle="tooltip"
                          title="fa fa-braille"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          data-bs-toggle="tooltip"
                          title="fa fa-briefcase"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBug}
                          data-bs-toggle="tooltip"
                          title="fa fa-bug"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBuilding}
                          data-bs-toggle="tooltip"
                          title="fa fa-building"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBullhorn}
                          data-bs-toggle="tooltip"
                          title="fa fa-bullhorn"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBullseye}
                          data-bs-toggle="tooltip"
                          title="fa fa-bullseye"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faBus}
                          data-bs-toggle="tooltip"
                          title="fa fa-bus"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCalculator}
                          data-bs-toggle="tooltip"
                          title="fa fa-calculator"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCalendar}
                          data-bs-toggle="tooltip"
                          title="fa fa-calendar"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCamera}
                          data-bs-toggle="tooltip"
                          title="fa fa-camera"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCameraRetro}
                          data-bs-toggle="tooltip"
                          title="fa fa-camera-retro"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCar}
                          data-bs-toggle="tooltip"
                          title="fa fa-car"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-caret-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCaretLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-caret-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCaretRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-caret-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCartArrowDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-cart-arrow-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCartPlus}
                          data-bs-toggle="tooltip"
                          title="fa fa-cart-plus"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCertificate}
                          data-bs-toggle="tooltip"
                          title="fa fa-certificate"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCheck}
                          data-bs-toggle="tooltip"
                          title="fa fa-check"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          data-bs-toggle="tooltip"
                          title="fa fa-check-circle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronCircleLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-circle-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronCircleRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-circle-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronCircleUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-circle-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-left"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-right"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-chevron-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faChild}
                          data-bs-toggle="tooltip"
                          title="fa fa-child"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCircle}
                          data-bs-toggle="tooltip"
                          title="fa fa-circle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faClipboard}
                          data-bs-toggle="tooltip"
                          title="fa fa-clipboard"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faClone}
                          data-bs-toggle="tooltip"
                          title="fa fa-clone"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCloud}
                          data-bs-toggle="tooltip"
                          title="fa fa-cloud"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCode}
                          data-bs-toggle="tooltip"
                          title="fa fa-code"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCoffee}
                          data-bs-toggle="tooltip"
                          title="fa fa-coffee"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCog}
                          data-bs-toggle="tooltip"
                          title="fa fa-cog"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCogs}
                          data-bs-toggle="tooltip"
                          title="fa fa-cogs"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faColumns}
                          data-bs-toggle="tooltip"
                          title="fa fa-columns"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faComment}
                          data-bs-toggle="tooltip"
                          title="fa fa-comment"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCompress}
                          data-bs-toggle="tooltip"
                          title="fa fa-compress"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCopyright}
                          data-bs-toggle="tooltip"
                          title="fa fa-copyright"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          data-bs-toggle="tooltip"
                          title="fa fa-credit-card"
                        />
                      </li>

                      <li>
                        <FontAwesomeIcon
                          icon={faDesktop}
                          data-bs-toggle="tooltip"
                          title="fa fa-desktop"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEdit}
                          data-bs-toggle="tooltip"
                          title="fa fa-edit"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEject}
                          data-bs-toggle="tooltip"
                          title="fa fa-eject"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          data-bs-toggle="tooltip"
                          title="fa fa-ellipsis-h"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          data-bs-toggle="tooltip"
                          title="fa fa-ellipsis-v"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          data-bs-toggle="tooltip"
                          title="fa fa-envelope"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEnvelopeOpen}
                          data-bs-toggle="tooltip"
                          title="fa fa-envelope-open"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEnvelopeSquare}
                          data-bs-toggle="tooltip"
                          title="fa fa-envelope-square"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEraser}
                          data-bs-toggle="tooltip"
                          title="fa fa-eraser"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faExclamation}
                          data-bs-toggle="tooltip"
                          title="fa fa-exclamation"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faExclamationCircle}
                          data-bs-toggle="tooltip"
                          title="fa fa-exclamation-circle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faExclamationTriangle}
                          data-bs-toggle="tooltip"
                          title="fa fa-exclamation-triangle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faExpand}
                          data-bs-toggle="tooltip"
                          title="fa fa-expand"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEye}
                          data-bs-toggle="tooltip"
                          title="fa fa-eye"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          data-bs-toggle="tooltip"
                          title="fa fa-eye-slash"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFastBackward}
                          data-bs-toggle="tooltip"
                          title="fa fa-fast-backward"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFastForward}
                          data-bs-toggle="tooltip"
                          title="fa fa-fast-forward"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFax}
                          data-bs-toggle="tooltip"
                          title="fa fa-fax"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFemale}
                          data-bs-toggle="tooltip"
                          title="fa fa-female"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFighterJet}
                          data-bs-toggle="tooltip"
                          title="fa fa-fighter-jet"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFile}
                          data-bs-toggle="tooltip"
                          title="fa fa-file"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFire}
                          data-bs-toggle="tooltip"
                          title="fa fa-fire"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFireExtinguisher}
                          data-bs-toggle="tooltip"
                          title="fa fa-fire-extinguisher"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFlag}
                          data-bs-toggle="tooltip"
                          title="fa fa-flag"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faFlagCheckered}
                          data-bs-toggle="tooltip"
                          title="fa fa-flag-checkered"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faRoad}
                          data-bs-toggle="tooltip"
                          title="fa fa-road"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faRocket}
                          data-bs-toggle="tooltip"
                          title="fa fa-rocket"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSave}
                          data-bs-toggle="tooltip"
                          title="fa fa-save"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSearch}
                          data-bs-toggle="tooltip"
                          title="fa fa-search"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSearchMinus}
                          data-bs-toggle="tooltip"
                          title="fa fa-search-minus"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSearchPlus}
                          data-bs-toggle="tooltip"
                          title="fa fa-search-plus"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faServer}
                          data-bs-toggle="tooltip"
                          title="fa fa-server"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShare}
                          data-bs-toggle="tooltip"
                          title="fa fa-share"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShareAlt}
                          data-bs-toggle="tooltip"
                          title="fa fa-share-alt"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShareAltSquare}
                          data-bs-toggle="tooltip"
                          title="fa fa-share-alt-square"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShareSquare}
                          data-bs-toggle="tooltip"
                          title="fa fa-share-square"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShip}
                          data-bs-toggle="tooltip"
                          title="fa fa-ship"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShoppingBag}
                          data-bs-toggle="tooltip"
                          title="fa fa-shopping-bag"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShoppingBasket}
                          data-bs-toggle="tooltip"
                          title="fa fa-shopping-basket"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          data-bs-toggle="tooltip"
                          title="fa fa-shopping-cart"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faShower}
                          data-bs-toggle="tooltip"
                          title="fa fa-shower"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSignLanguage}
                          data-bs-toggle="tooltip"
                          title="fa fa-sign-language"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSignal}
                          data-bs-toggle="tooltip"
                          title="fa fa-signal"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSitemap}
                          data-bs-toggle="tooltip"
                          title="fa fa-sitemap"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSort}
                          data-bs-toggle="tooltip"
                          title="fa fa-sort"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSortDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-sort-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSquare}
                          data-bs-toggle="tooltip"
                          title="fa fa-square"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStar}
                          data-bs-toggle="tooltip"
                          title="fa fa-star"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStarHalf}
                          data-bs-toggle="tooltip"
                          title="fa fa-star-half"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStepBackward}
                          data-bs-toggle="tooltip"
                          title="fa fa-step-backward"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStepForward}
                          data-bs-toggle="tooltip"
                          title="fa fa-step-forward"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStethoscope}
                          data-bs-toggle="tooltip"
                          title="fa fa-stethoscope"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStickyNote}
                          data-bs-toggle="tooltip"
                          title="fa fa-sticky-note"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStop}
                          data-bs-toggle="tooltip"
                          title="fa fa-stop"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStopCircle}
                          data-bs-toggle="tooltip"
                          title="fa fa-stop-circle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faStreetView}
                          data-bs-toggle="tooltip"
                          title="fa fa-street-view"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSubscript}
                          data-bs-toggle="tooltip"
                          title="fa fa-subscript"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSuitcase}
                          data-bs-toggle="tooltip"
                          title="fa fa-suitcase"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faSuperscript}
                          data-bs-toggle="tooltip"
                          title="fa fa-superscript"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTable}
                          data-bs-toggle="tooltip"
                          title="fa fa-table"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTag}
                          data-bs-toggle="tooltip"
                          title="fa fa-tag"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTags}
                          data-bs-toggle="tooltip"
                          title="fa fa-tags"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTasks}
                          data-bs-toggle="tooltip"
                          title="fa fa-tasks"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTaxi}
                          data-bs-toggle="tooltip"
                          title="fa fa-taxi"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTerminal}
                          data-bs-toggle="tooltip"
                          title="fa fa-terminal"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTextHeight}
                          data-bs-toggle="tooltip"
                          title="fa fa-text-height"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTextWidth}
                          data-bs-toggle="tooltip"
                          title="fa fa-text-width"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTh}
                          data-bs-toggle="tooltip"
                          title="fa fa-th"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThLarge}
                          data-bs-toggle="tooltip"
                          title="fa fa-th-large"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThList}
                          data-bs-toggle="tooltip"
                          title="fa fa-th-list"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThermometer}
                          data-bs-toggle="tooltip"
                          title="fa fa-thermometer"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThermometerEmpty}
                          data-bs-toggle="tooltip"
                          title="fa fa-thermometer-empty"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThermometerFull}
                          data-bs-toggle="tooltip"
                          title="fa fa-thermometer-full"
                        />
                      </li>

                      <li>
                        <FontAwesomeIcon
                          icon={faThermometerHalf}
                          data-bs-toggle="tooltip"
                          title="fa fa-thermometer-half"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThermometerQuarter}
                          data-bs-toggle="tooltip"
                          title="fa fa-thermometer-quarter"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThermometerThreeQuarters}
                          data-bs-toggle="tooltip"
                          title="fa fa-thermometer-three-quarters"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThumbsDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-thumbs-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-thumbs-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTimes}
                          data-bs-toggle="tooltip"
                          title="fa fa-times"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          data-bs-toggle="tooltip"
                          title="fa fa-times-circle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTint}
                          data-bs-toggle="tooltip"
                          title="fa fa-tint"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faToggleOff}
                          data-bs-toggle="tooltip"
                          title="fa fa-toggle-off"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faToggleOn}
                          data-bs-toggle="tooltip"
                          title="fa fa-toggle-on"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTrademark}
                          data-bs-toggle="tooltip"
                          title="fa fa-trademark"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTrain}
                          data-bs-toggle="tooltip"
                          title="fa fa-train"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTransgender}
                          data-bs-toggle="tooltip"
                          title="fa fa-transgender"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTransgenderAlt}
                          data-bs-toggle="tooltip"
                          title="fa fa-transgender-alt"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTrash}
                          data-bs-toggle="tooltip"
                          title="fa fa-trash"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTree}
                          data-bs-toggle="tooltip"
                          title="fa fa-tree"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTrophy}
                          data-bs-toggle="tooltip"
                          title="fa fa-trophy"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTty}
                          data-bs-toggle="tooltip"
                          title="fa fa-tty"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faTv}
                          data-bs-toggle="tooltip"
                          title="fa fa-tv"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUmbrella}
                          data-bs-toggle="tooltip"
                          title="fa fa-umbrella"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUnderline}
                          data-bs-toggle="tooltip"
                          title="fa fa-underline"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUndo}
                          data-bs-toggle="tooltip"
                          title="fa fa-undo"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUniversalAccess}
                          data-bs-toggle="tooltip"
                          title="fa fa-universal-access"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUniversity}
                          data-bs-toggle="tooltip"
                          title="fa fa-university"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUnlink}
                          data-bs-toggle="tooltip"
                          title="fa fa-unlink"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUnlock}
                          data-bs-toggle="tooltip"
                          title="fa fa-unlock"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUnlockAlt}
                          data-bs-toggle="tooltip"
                          title="fa fa-unlock-alt"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUpload}
                          data-bs-toggle="tooltip"
                          title="fa fa-upload"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          data-bs-toggle="tooltip"
                          title="fa fa-user-circle"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUserMd}
                          data-bs-toggle="tooltip"
                          title="fa fa-user-md"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          data-bs-toggle="tooltip"
                          title="fa fa-user-plus"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUserSecret}
                          data-bs-toggle="tooltip"
                          title="fa fa-user-secret"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUserTimes}
                          data-bs-toggle="tooltip"
                          title="fa fa-user-times"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faUsers}
                          data-bs-toggle="tooltip"
                          title="fa fa-users"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faVenus}
                          data-bs-toggle="tooltip"
                          title="fa fa-venus"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faVenusDouble}
                          data-bs-toggle="tooltip"
                          title="fa fa-venus-double"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faVenusMars}
                          data-bs-toggle="tooltip"
                          title="fa fa-venus-mars"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faVolumeDown}
                          data-bs-toggle="tooltip"
                          title="fa fa-volume-down"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faVolumeOff}
                          data-bs-toggle="tooltip"
                          title="fa fa-volume-off"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faVolumeUp}
                          data-bs-toggle="tooltip"
                          title="fa fa-volume-up"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWheelchair}
                          data-bs-toggle="tooltip"
                          title="fa fa-wheelchair"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWifi}
                          data-bs-toggle="tooltip"
                          title="fa fa-wifi"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWindowClose}
                          data-bs-toggle="tooltip"
                          title="fa fa-window-close"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWindowMaximize}
                          data-bs-toggle="tooltip"
                          title="fa fa-window-maximize"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWindowMinimize}
                          data-bs-toggle="tooltip"
                          title="fa fa-window-minimize"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWindowRestore}
                          data-bs-toggle="tooltip"
                          title="fa fa-window-restore"
                        />
                      </li>
                      <li>
                        <FontAwesomeIcon
                          icon={faWrench}
                          data-bs-toggle="tooltip"
                          title="fa fa-wrench"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* /Chart */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};
export default FontawesomeIcons;
