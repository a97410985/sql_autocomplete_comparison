<template>
  <v-card class="ma-5">
    <v-card>
      <v-card-title>autocomplete scenarios</v-card-title>
      <v-card
        class="ma-2"
        v-for="data in autocompleteScenarioDatas"
        :key="data.name"
      >
        <v-card-title>{{ data.name }}</v-card-title>
        <v-card-text
          class="sql-statement-container pa-2 ma-2"
          style="position: relative; border: 1px solid gray"
        >
          <div
            class="sql-statement"
            style="white-space: pre-wrap; color: black"
          >
            {{ data.sqlStatement }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn>view tables schema</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

interface CursorPos {
  row: number
  column: number
}

interface SchemaData {
  tables: { name: string; columns: { name: string; type: string }[] }[]
}

interface AutocompleteScenarioData {
  name: string
  sqlStatement: string
  textCursorPos: CursorPos
  schemaData: SchemaData
}
@Component({
  components: {}
})
export default class AutocompleteComparison extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    const sqlStatementContainers = document.getElementsByClassName(
      "sql-statement-container"
    )
    for (let i = 0; i < sqlStatementContainers.length; i++) {
      const curData = this.autocompleteScenarioDatas[i]
      const sqlStatementCuror = sqlStatementContainers[
        i
      ].getElementsByClassName("sql-statement-curor")
      const sqlStatements =
        sqlStatementContainers[i].getElementsByClassName("sql-statement")
      if (sqlStatementCuror.length === 0) {
        const newDiv = document.createElement("span")
        newDiv.style.whiteSpace = "pre-wrap"
        newDiv.textContent = curData.sqlStatement
          .split("\n")
          [curData.textCursorPos.row].substring(0, curData.textCursorPos.column)
        sqlStatementContainers[i].appendChild(newDiv)
        console.log(newDiv.getClientRects())
        console.log(newDiv.getBoundingClientRect())
        const width = newDiv.getBoundingClientRect().width
        const heightText = window
          .getComputedStyle(newDiv, null)
          .getPropertyValue("line-height")
        const height = parseInt(heightText.substr(0, heightText.length - 2))

        newDiv.remove()
        const newCursor = document.createElement("div")
        newCursor.style.position = "absolute"

        const curContainer = sqlStatementContainers[i] as HTMLDivElement

        const textPaddingLeft = window
          .getComputedStyle(curContainer, null)
          .getPropertyValue("padding-left")
        const textPaddingTop = window
          .getComputedStyle(curContainer, null)
          .getPropertyValue("padding-Top")
        const paddingLeft = parseInt(
          textPaddingLeft.substr(0, textPaddingLeft.length - 2)
        )
        const paddingTop = parseInt(
          textPaddingTop.substr(0, textPaddingTop.length - 2)
        )
        newCursor.style.position = "absolute"
        newCursor.style.fontWeight = "bold"
        newCursor.className = "fake-cursor"
        newCursor.style.display = "inline-block"
        newCursor.style.whiteSpace = "pre-wrap"
        newCursor.textContent = "|"
        sqlStatements[0].appendChild(newCursor)
        const cursorWid = newCursor.getBoundingClientRect().width
        console.log(cursorWid)
        newCursor.style.left = paddingLeft + width - cursorWid / 2 + "px"
        newCursor.style.top =
          paddingTop + height * curData.textCursorPos.row + "px"
        newCursor.textContent = " |"
      }
    }
    setInterval(() => {
      const fackCursors = document.getElementsByClassName("fake-cursor")
      for (let index = 0; index < fackCursors.length; index++) {
        const cursorDom = fackCursors[index] as HTMLDivElement
        if (cursorDom.style.visibility === "visible") {
          cursorDom.style.visibility = "hidden"
        } else {
          cursorDom.style.visibility = "visible"
        }
      }
    }, 500)
  }

  calculateTextWidth(text: string): number {
    const newText = document.createElement("span")
    // newText.style.font = "Roboto, sans-serif"
    // newText.style.fontSize = "0.875rem"
    newText.className = "v-card__text"
    newText.textContent = text
    document.body.appendChild(newText)
    const width = newText.getBoundingClientRect().width
    console.log("width : ", width)
    // newText.remove()
    return width
  }

  calculateTextLeft(text: string): number {
    const container = document.getElementsByClassName(
      "sql-statement"
    )[0] as HTMLElement
    const newText = document.createElement("span")
    newText.style.font = "aria"
    newText.style.fontSize = "15px"
    newText.textContent = text
    document.body.appendChild(newText)
    const left =
      newText.getBoundingClientRect().width +
      container.getBoundingClientRect().left
    newText.remove()
    return left
  }

  cursorLeft = "100px"
  autocompleteScenarioDatas: AutocompleteScenarioData[] = [
    {
      name: "autocomplete for columns(select column from table)",
      sqlStatement: "select  from student",
      textCursorPos: {
        row: 0,
        column: 7
      },
      schemaData: {
        tables: [
          {
            name: "student",
            columns: [
              {
                name: "name",
                type: "varchar(20)"
              },
              {
                name: "phone number",
                type: "varchar(20)"
              }
            ]
          }
        ]
      }
    },
    {
      name: "autocomplete for schema data's type(creating new table)",
      sqlStatement:
        "create table student (\n" +
        "    name    varchar(20),\n" +
        "    age     int(11),\n" +
        "    address \n" +
        ")",
      textCursorPos: {
        row: 3,
        column: 12
      },
      schemaData: {
        tables: [
          {
            name: "student",
            columns: [
              {
                name: "name",
                type: "varchar(20)"
              },
              {
                name: "phone number",
                type: "varchar(20)"
              }
            ]
          }
        ]
      }
    }
  ]
}
</script>
