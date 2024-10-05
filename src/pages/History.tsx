import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styling/History.css";
import {
  endOfMonth,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import DatePicker from "react-datepicker";
import EmotionPieChart from "../components/Emotionpiechartcard";
import { emotionColors } from "../assets/emotionColors";
import Very_good from "../assets/img/emotion/🦆 emoji _smiling face with sunglasses_.svg";
import Good from "../assets/img/emotion/🦆 emoji _slightly smiling face_.svg";
import Meh from "../assets/img/emotion/🦆 emoji _neutral face_.svg";
import Sad from "../assets/img/emotion/🦆 emoji _confused face_.svg";
import Very_sad from "../assets/img/emotion/🦆 emoji _worried face_.svg";

type EmotionEntry = {
  name: string;
  value: number;
  date: string;
};
type AggregatedEmotionEntry = {
  name: string;
  value: number;
  fill: string;
};
const emotionOrder = ["Very_good", "Good", "Meh", "Sad", "Very_sad"];

const emotionData: EmotionEntry[] = [
  { name: "Meh", value: 6, date: "2024-10-30" },
  { name: "Good", value: 3, date: "2024-11-01" },
  { name: "Very_sad", value: 3, date: "2024-04-13" },
  { name: "Very_good", value: 10, date: "2024-09-11" },
  { name: "Good", value: 8, date: "2024-10-14" },
  { name: "Very_sad", value: 6, date: "2024-09-17" },
  { name: "Very_good", value: 5, date: "2024-08-03" },
  { name: "Very_sad", value: 3, date: "2024-01-16" },
  { name: "Very_good", value: 8, date: "2024-07-30" },
  { name: "Meh", value: 10, date: "2024-05-04" },
  { name: "Very_sad", value: 8, date: "2024-05-07" },
  { name: "Very_sad", value: 9, date: "2024-06-16" },
  { name: "Sad", value: 5, date: "2024-03-11" },
  { name: "Very_sad", value: 4, date: "2024-05-12" },
  { name: "Very_sad", value: 6, date: "2024-09-13" },
  { name: "Sad", value: 8, date: "2024-05-13" },
  { name: "Good", value: 3, date: "2024-11-20" },
  { name: "Good", value: 6, date: "2024-01-21" },
  { name: "Very_sad", value: 2, date: "2024-06-14" },
  { name: "Meh", value: 2, date: "2024-11-14" },
  { name: "Good", value: 2, date: "2024-11-15" },
  { name: "Very_sad", value: 9, date: "2024-10-26" },
  { name: "Very_good", value: 8, date: "2024-05-12" },
  { name: "Meh", value: 2, date: "2024-10-07" },
  { name: "Sad", value: 9, date: "2024-07-05" },
  { name: "Meh", value: 4, date: "2024-08-22" },
  { name: "Very_good", value: 8, date: "2024-11-11" },
  { name: "Very_sad", value: 10, date: "2024-04-05" },
  { name: "Good", value: 3, date: "2024-03-15" },
  { name: "Very_sad", value: 1, date: "2024-10-26" },
  { name: "Good", value: 3, date: "2024-07-18" },
  { name: "Sad", value: 9, date: "2024-08-07" },
  { name: "Very_sad", value: 1, date: "2024-03-01" },
  { name: "Very_good", value: 5, date: "2024-07-31" },
  { name: "Meh", value: 1, date: "2024-04-27" },
  { name: "Very_sad", value: 9, date: "2024-05-10" },
  { name: "Good", value: 2, date: "2024-06-19" },
  { name: "Sad", value: 7, date: "2024-05-26" },
  { name: "Very_good", value: 7, date: "2024-03-12" },
  { name: "Good", value: 6, date: "2024-11-08" },
  { name: "Very_sad", value: 6, date: "2024-04-08" },
  { name: "Meh", value: 5, date: "2024-06-02" },
  { name: "Good", value: 10, date: "2024-01-07" },
  { name: "Sad", value: 10, date: "2024-07-28" },
  { name: "Sad", value: 2, date: "2024-02-24" },
  { name: "Very_sad", value: 5, date: "2024-11-13" },
  { name: "Meh", value: 9, date: "2024-09-09" },
  { name: "Very_good", value: 5, date: "2024-02-15" },
  { name: "Meh", value: 6, date: "2024-10-03" },
  { name: "Good", value: 8, date: "2024-10-06" },
  { name: "Very_good", value: 5, date: "2024-07-25" },
  { name: "Very_good", value: 2, date: "2024-10-09" },
  { name: "Sad", value: 4, date: "2024-05-19" },
  { name: "Good", value: 10, date: "2024-12-06" },
  { name: "Sad", value: 9, date: "2024-11-07" },
  { name: "Good", value: 10, date: "2024-01-04" },
  { name: "Very_sad", value: 10, date: "2024-01-09" },
  { name: "Good", value: 8, date: "2024-08-02" },
  { name: "Good", value: 3, date: "2024-11-12" },
  { name: "Sad", value: 9, date: "2024-10-21" },
  { name: "Meh", value: 8, date: "2024-10-09" },
  { name: "Meh", value: 6, date: "2024-12-16" },
  { name: "Very_sad", value: 10, date: "2024-02-26" },
  { name: "Meh", value: 1, date: "2024-04-24" },
  { name: "Very_good", value: 9, date: "2024-11-25" },
  { name: "Meh", value: 9, date: "2024-08-28" },
  { name: "Very_sad", value: 6, date: "2024-11-10" },
  { name: "Good", value: 9, date: "2024-04-02" },
  { name: "Sad", value: 9, date: "2024-11-22" },
  { name: "Sad", value: 2, date: "2024-02-09" },
  { name: "Sad", value: 8, date: "2024-07-04" },
  { name: "Very_sad", value: 10, date: "2024-11-21" },
  { name: "Very_good", value: 6, date: "2024-09-27" },
  { name: "Very_good", value: 10, date: "2024-12-30" },
];

const filterByDay = (data: EmotionEntry[], specificDate: Date) => {
  return data.filter((entry) => isSameDay(parseISO(entry.date), specificDate));
};

const filterByWeek = (data: EmotionEntry[], specificDate: Date) => {
  return data.filter((entry) => {
    const start = startOfWeek(specificDate, { weekStartsOn: 1 });
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return parseISO(entry.date) >= start && parseISO(entry.date) <= end;
  });
};

const filterByMonth = (data: EmotionEntry[], specificDate: Date) => {
  const start = startOfMonth(specificDate);
  const end = endOfMonth(specificDate);
  return data.filter((entry) => {
    const date = parseISO(entry.date);
    return date >= start && date <= end;
  });
};

const aggregateData = (data: EmotionEntry[]): AggregatedEmotionEntry[] => {
  const aggregated: Record<string, number> = {};
  data.forEach((entry) => {
    if (aggregated[entry.name]) {
      aggregated[entry.name] += entry.value;
    } else {
      aggregated[entry.name] = entry.value;
    }
  });
  return Object.entries(aggregated)
    .map(([name, value]) => ({
      name,
      value,
      fill: emotionColors[name] || "#cccccc",
    }))
    .sort((a, b) => {
      return emotionOrder.indexOf(a.name) - emotionOrder.indexOf(b.name);
    });
};
const getEmotionImage = (name: string): string => {
  switch (name) {
    case "Very_good":
      return Very_good;
    case "Good":
      return Good;
    case "Meh":
      return Meh;
    case "Sad":
      return Sad;
    case "Very_sad":
      return Very_sad;
    default:
      return "";
  }
};
const History: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayData, setDayData] = useState<AggregatedEmotionEntry[]>([]);
  const [weekData, setWeekData] = useState<AggregatedEmotionEntry[]>([]);
  const [monthData, setMonthData] = useState<AggregatedEmotionEntry[]>([]);
  const [aggregatedSummary, setAggregatedSummary] = useState<
    AggregatedEmotionEntry[]
  >([]);

  useEffect(() => {
    const filteredDayData = filterByDay(emotionData, selectedDate);
    const filteredWeekData = filterByWeek(emotionData, selectedDate);
    const filteredMonthData = filterByMonth(emotionData, selectedDate);

    setDayData(aggregateData(filteredDayData));
    setWeekData(aggregateData(filteredWeekData));
    setMonthData(
      aggregateData(filteredMonthData).map((emotion) => ({
        ...emotion,
        fill: emotionColors[emotion.name] || "#cccccc",
      }))
    );
    setAggregatedSummary(aggregateData(emotionData));
  }, [selectedDate]);
  const formatEmotionName = (name: string) => {
    return name
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };
  return (
    <>
      <Navbar />
      <div className="History-wrapper">
        <div className="chart-card-wrapper">
          <div className="chart-card-header">
            <div className="chart-card-header-context">
              <h4>Daily</h4>
              <h3>Mood History</h3>
            </div>
            <div className="chart-card-header-datepicker">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => date && setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
          <hr
            style={{
              width: "85%",
              display: "flex",
              color: "lightgray",
            }}
          ></hr>
          <div className="chart-card-content">
            <div className="chart-card-content-chart">
              <EmotionPieChart
                data={dayData}
                title="Emotion Stats for Selected Month"
              />
            </div>
            <div className="chart-card-content-statistic">
              <h3>Statistic data of a Day</h3>
              <ul>
                {dayData.map((emotion) => (
                  <li key={emotion.name}>
                    <div
                      className="card-statistic"
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="the-dot"
                        style={{
                          width: "8px",
                          height: "8px",
                          background: emotion.fill,
                          borderRadius: "30px",
                        }}
                      ></div>
                      <div>
                        {formatEmotionName(emotion.name)} : {emotion.value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="chart-card-wrapper">
          <div className="chart-card-header">
            <div className="chart-card-header-context">
              <h4>Weekly</h4>
              <h3>Mood History</h3>
            </div>
            <div className="chart-card-header-datepicker">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => date && setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
          <hr
            style={{
              width: "85%",
              display: "flex",
              color: "lightgray",
            }}
          ></hr>
          <div className="chart-card-content">
            <div className="chart-card-content-chart">
              <EmotionPieChart
                data={weekData}
                title="Emotion Stats for Selected Month"
              />
            </div>
            <div className="chart-card-content-statistic">
              <h3>Statistic data of a Week</h3>
              <ul>
                {weekData.map((emotion) => (
                  <li key={emotion.name}>
                    <div
                      className="card-statistic"
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="the-dot"
                        style={{
                          width: "8px",
                          height: "8px",
                          background: emotion.fill,
                          borderRadius: "30px",
                        }}
                      ></div>
                      <div>
                        {formatEmotionName(emotion.name)} : {emotion.value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="chart-card-wrapper">
          <div className="chart-card-header">
            <div className="chart-card-header-context">
              <h4>monthly</h4>
              <h3>Mood History</h3>
            </div>
            <div className="chart-card-header-datepicker">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => date && setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
          <hr
            style={{
              width: "85%",
              display: "flex",
              color: "lightgray",
            }}
          ></hr>
          <div className="chart-card-content">
            <div className="chart-card-content-chart">
              <EmotionPieChart
                data={monthData}
                title="Emotion Stats for Selected Month"
              />
            </div>
            <div className="chart-card-content-statistic">
              <h3>Statistic data of a Month</h3>
              <ul>
                {monthData.map((emotion) => (
                  <li key={emotion.name}>
                    <div
                      className="card-statistic"
                      style={{
                        display: "flex",
                        gap: "0.3rem",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="the-dot"
                        style={{
                          width: "8px",
                          height: "8px",
                          background: emotion.fill,
                          borderRadius: "30px",
                        }}
                      ></div>
                      <div>
                        {formatEmotionName(emotion.name)} : {emotion.value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div style={{ width: "50%", marginTop: "1rem" }}>
          <h3 style={{}}>My Emotion Summary</h3>
          <ul style={{ marginLeft: "5rem", marginTop: "1rem" }}>
            {aggregatedSummary.map((emotion) => (
              <li
                key={emotion.name}
                style={{ color: emotion.fill, display: "flex", gap: "1rem" }}
              >
                <img
                  src={getEmotionImage(emotion.name)}
                  alt={emotion.name}
                  style={{
                    width: "55px",
                    height: "55px",
                    marginRight: "2rem",
                    cursor: "context-menu",
                  }}
                />
                <div style={{ paddingTop: "1rem", color: "black" }}>
                  {formatEmotionName(emotion.name)} : {emotion.value} Times
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default History;
