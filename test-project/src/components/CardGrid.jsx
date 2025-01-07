export function CardGrid({
  data,
  renderItem,
  columns = "col-md-4 col-sm-6 mb-4",
}) {
  return (
    <div class="row">
      {Object.entries(data).map(([key, value]) => (
        <div class={columns} key={key}>
          {renderItem(key, value)}
        </div>
      ))}
    </div>
  );
}
``;
