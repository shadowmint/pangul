import React from 'react';
import Spinner from '../../../src/glyphs/spinner';
import Stop from "../../../src/glyphs/stop";

export default function GlyphDemo() {
  return (
    <div>
      <div className="example glyph">
        <Spinner />
      </div>
      <div className="example glyph">
        <Spinner size={16} />
      </div>
      <div className="example glyph">
        <Stop />
      </div>
      <div className="example glyph">
        <Stop size={16} />
      </div>
    </div>
  );
}
