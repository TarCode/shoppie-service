import app from './app'
import { PORT } from './constants/shoppie.constants'

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
